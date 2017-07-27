/**
 * Created by usuario1 on 7/26/2017.
 */

const templates = require('../templates');
let BodyCF   = templates.bodyChat;
let TextCF   = templates.textChat;

function validationsErrors(err, req, res, next) {
    if(err){
        let body = new BodyCF();
        let text = new TextCF(err.message);
        body.add(text);
        body.content.redirect_to_blocks = [];
        body.content.redirect_to_blocks.push(Object.keys(req.query)[1]);

        res.send(body.content);
    }else {
        next();
    }
}

module.exports = validationsErrors;