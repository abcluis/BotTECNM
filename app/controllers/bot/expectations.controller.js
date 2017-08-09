let surveyService = require('../../services/survey.service');
let handleErrors  = require('../../utils/handle.errors');

let utils = require('../../utils/controller.utils');

function storeBooleanExpectations(req, res) {

    let data = utils.generateData(req);

    data.value = utils.convertToBoolean(data.value);

    surveyService.updateExpectationsData(data.id, data.field, data.value)
        .then(() => res.send(utils.createResponse(data.field, data.value)))
        .catch((err) => res.send(err));

}

function storeExpectations(req, res) {

    let data = utils.generateData(req);

    surveyService.updateExpectationsData(data.id,data.field, data.value)
        .then((survey) => res.send(utils.createResponse(data.field, data.value)))
        .catch((err) => handleErrors(err,res, data.field));
}


module.exports = {
    storeBooleanExpectations: storeBooleanExpectations,
    storeExpectations:        storeExpectations
};