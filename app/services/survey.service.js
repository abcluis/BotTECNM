/**
 * Created by usuario1 on 6/22/2017.
 */
const Survey = require('../models/survey.model');

module.exports = {
    findOneSurvey: findOneSurvey,
    createSurvey:  createSurvey
};


function findOneSurvey(id) {
    return Survey.findOne({id_student: id});
}

function createSurvey(body) {
    let survey = new Survey(body);
    return survey.save();
}

function updatePersonalData() {
    
}