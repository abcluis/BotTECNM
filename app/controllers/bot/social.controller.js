let surveyService = require('../../services/survey.service');
let handleErrors  = require('../../utils/handle.errors');


let utils = require('../../utils/controller.utils');

function storeBooleanSocial(req, res) {

    let data = utils.generateData(req);

    data.value = utils.convertToBoolean(data.value);

    surveyService.updateSocialData(data.id, data.field, data.value)
        .then(() => res.send(utils.createResponse(data.field, data.value)))
        .catch((err) => handleErrors(err, res, data.field));
}

function storeSocialData(req, res) {
    let data = utils.generateData(req);

    surveyService.updateSocialData(data.id, data.field, data.value)
        .then(() => res.send(utils.createResponse(data.field, data.value)))
        .catch((err) => handleErrors(err, res, data.field));
}


module.exports = {
    storeBooleanSocial : storeBooleanSocial,
    storeSocialData: storeSocialData
};