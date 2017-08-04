let surveyService = require('../../services/survey.service');
let handleErrors  = require('../../utils/handle.errors');
let messages      = require('../../utils/messages.bot');
let nextBlock     = require('../../utils/blocks.order');

let id_field = 'messenger user id';


const templates = require('../../templates');

let BodyCF = templates.bodyChat;
let TextCF = templates.textChat;

function registerData(req, res) {


    let id = req.query[id_field];
    let field;
    let value;

    for (let i in req.query) {
        if (i !== id_field) {
            field = i;
            value = req.query[i];
        }
    }


    surveyService.updatePerformanceData(id, field, value)
        .then(function (survey) {
            let body = new BodyCF();
            let text = new TextCF(messages.nextSentence);
            body.add(text);
            body.content.redirect_to_blocks = [];
            body.content.redirect_to_blocks.push(nextBlock(field));
            res.send(body.content);
        })
        .catch(function (err) {
            handleErrors(err, res, field);
        })

}


module.exports = {
    registerData: registerData
};
