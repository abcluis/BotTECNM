/**
 * Created by usuario1 on 7/26/2017.
 */

const templates = require('../templates');
let BodyCF   = templates.bodyChat;
let TextCF   = templates.textChat;
// https://api.chatfuel.com/bots/5941e907e4b07123678c4199/users/1453872458011175/send?chatfuel_token=vnbqX6cpvXUXFcOKr5RHJ7psSpHDRzO1hXBY8dkvn50ZkZyWML3YdtoCnKH7FSjC&chatfuel_block_name=full_name&attrprueba=20
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