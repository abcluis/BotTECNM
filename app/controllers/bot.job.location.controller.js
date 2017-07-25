const userService   = require('../services/user.service');
const surveyService = require("../services/survey.service");
const templates     = require("../templates");
const blocks        = require("../utils/blocks.constants");
const nextBlock     = require("../utils/blocks.order");

let user_id = "messenger user id";
module.exports = {
  registerJobLocation: registerJobLocation,
  initJobLocation: initJobLocation
};

function initJobLocation(req, res) {
  let response = new templates.bodyChat();
  let card = new templates.cardChat("¿Continuamos?");
  let btn1 = new templates.buttonBlockChat("OK", blocks.BLOCK_ACTUAL_ACTIVITY);

  card.addButton(btn1);
  response.add(card);
  res.send(response.content);
}

function registerJobLocation(req, res) {
  let keys = Object.keys(req.body);
  let id = req.body[user_id];
  let field = keys[1];
  let value = req.body[field];
  // res.send({ id: id, field: field, value: value });
   surveyService
    .updateJobLocationData(id, field, value)
    .then(() => {
      let response = new templates.bodyChat();
      let redirectBlock = new templates.redirectChat(nextBlock(field));

      response.add(redirectBlock);
      let body = new templates.bodyChat();
      let card = new templates.cardChat(
        "La informacion es correcta " + value + " ?"
      );
      let btnYes = new templates.buttonBlockChat("Yes", nextBlock(field));
      let btnNo = new templates.buttonBlockChat("No", field);
      card.addButton(btnYes);
      card.addButton(btnNo);
      body.add(card);
      res.send(body.content);
    })
    .catch(err => res.send(err)); 
}
