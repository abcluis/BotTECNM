let messages      = require('./messages.bot');
let nextBlock     = require('./blocks.order');

let id_field = 'messenger user id';

const templates = require('../templates.test');


function createResponse(field, value) {

    let generic = new templates.generic();

    let options = {};

    options[field] = value;

    return generic
        .addText('Perfecto avancemos a la siguiente pregunta')
        .addRedirect(nextBlock(field, options))
        .get();

}

function convertToBoolean(value) {
    return value === 'Si';
}

function generateData(req) {

    let id = req.query[id_field];
    let field;
    let value;

    for (let i in req.query) {
        if (i !== id_field) {
            field = i;
            value = req.query[i];
        }
    }

    return {
        id,
        field,
        value
    }

}

module.exports = {
    createResponse,
    convertToBoolean,
    generateData
};