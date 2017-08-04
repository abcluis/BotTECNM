/**
 * Created by usuario1 on 7/26/2017.
 */
module.exports = validations;

let blocks = require('../utils/blocks.constants');
let handleErrors = require('../utils/handle.errors');
let messages = require('../utils/messages.bot');

function validations(req, res, next) {

    let keys  = Object.keys(req.query);
    let field = keys[1];

    if (req.method === 'POST') {
        return next();
    }

    if(!isValidField(field)){
        // Campo no registrado
        let error = new Error(messages.fieldWithTypo);
        error.name = 'FieldInvalid';

        handleErrors(error,res,'school');

    }else {
        next();
    }
}

function isValidField(field) {

    for (let i in blocks) {
        if (blocks[i] === field){
            return true;
        }
    }

    return false;
}
