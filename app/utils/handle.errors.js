/**
 * Created by usuario1 on 8/2/2017.
 */



const templates = require('../templates');
let BodyCF      = templates.bodyChat;
let TextCF      = templates.textChat;


// Funcion encargada de convertir los errores a cosas entendibles para el bot

function handleErrors(err, res, field) {

    // ValidatorError son errores en la validacion del survey.model.js

    if (err.name === 'ValidationError') {

        let errors = err.errors;

        for (let i in errors) {
            let body = new BodyCF();
            let text = new TextCF(errors[i].message);
            body.add(text);
            body.content.redirect_to_blocks = [];
            body.content.redirect_to_blocks.push(field);
            res.send(body.content);
        }


    }else if(err.name === 'FieldInvalid') {

        let body = new BodyCF();
        let text = new TextCF(err.message);
        body.add(text);
        body.content.redirect_to_blocks = [];
        body.content.redirect_to_blocks.push('school');
        res.send(body.content);

    } else {
        res.send(err);
    }

}

module.exports = handleErrors;