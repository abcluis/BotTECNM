let surveyService = require('../../services/survey.service');
let handleErrors  = require('../../utils/handle.errors');
let messages      = require('../../utils/messages.bot');
let nextBlock     = require('../../utils/blocks.order');

let id_field = 'messenger user id';

const templates = require('../../templates.testtes');


function storeBooleanExpectations(req, res) {

    let data = generateData(req);

    data.value = convertToBoolean(value);

    surveyService.updateExpectationsData(id,data.field, data.value)
        .then(() => res.send(createResponse(data.field, data.value)))
        .catch((err) => res.send(err));

}

function createResponse(field,value) {

    let generic = new templates.generic();

    let options = {
        field : value
    };

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
    storeBooleanExpectations : storeBooleanExpectations
};