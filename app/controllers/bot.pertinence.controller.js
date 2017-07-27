const surveyService = require("../services/survey.service");
const templates = require("../templates");
const blocks = require("../utils/blocks.constants");
const nextBlock = require("../utils/blocks.order");
const userService = require("../services/user.service");

module.exports = {
  registerPertData: registerPertData,
  initPertData: initPertData
};

let BodyCF = templates.bodyChat;
let TextCF = templates.textChat;
let CardCF = templates.cardChat;
let ButtonCF = templates.buttonBlockChat;

let user_id = "messenger user id";

function initPertData(req, res) {
  let response = new templates.bodyChat();
  let card = new templates.cardChat("¿Continuamos?");
  let btn1 = new templates.buttonBlockChat("OK", blocks.BLOCK_QUALITY_TEACHERS);

  card.addButton(btn1);
  response.add(card);
  res.send(response.content);
}

function registerPertData(req, res) {
  let keys = Object.keys(req.query);
  let id = req.query[user_id];
  let field = keys[1];
  let value = req.query[field];

  let user = {
    id: id,
    last_block: nextBlock(field)
  };

  userService
    .updateLastBlock(user)
    .then(data => {
      return surveyService.updatePertinenceData(id, field, value);
    })
    .then(survey => {
      let body = new BodyCF();
      let text = new TextCF("La siguiente pregunta es : ");
      body.add(text);
      body.content.redirect_to_blocks = [];
      body.content.redirect_to_blocks.push(nextBlock(field));
      res.send(body.content);
    })
    .catch(err => res.send(err));
  //res.send({ id: id, field: field, value: value });
}
