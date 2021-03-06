/**
 * Created by usuario1 on 6/22/2017.
 */
const Survey = require("../models/survey.model");

module.exports = {
    findOneSurvey:          findOneSurvey,
    createSurvey:           createSurvey,
    updatePersonalData:     updatePersonalData,
    updatePertinenceData:   updatePertinenceData,
    updateJobLocationData:  updateJobLocationData,
    updatePerformanceData:  updatePerformanceData,
    updateExpectationsData: updateExpectationsData,
    updateSocialData:       updateSocialData
};

function findOneSurvey(id) {
    return Survey.findOne({id_student: id}).exec();
}

function createSurvey(body) {
    let survey = new Survey(body);
    return survey.save();
}

function updatePersonalData(id, field, value) {
    return Survey.findOne({id_student: id}).then(survey => {
        if (survey) {
            survey.personal_data[field] = value;
            return survey.save();
        }
    });
}

function updatePertinenceData(id, field, value) {
    return Survey.findOne({id_student: id}).then(survey => {
        if (survey) {
            survey.pertinence[field] = value;
            return survey.save();
        }
    });
}

function updateJobLocationData(id, field, value) {
    return Survey.findOne({id_student: id}).then(survey => {
        if (survey) {
            survey.work_aspect[field] = value;
            return survey.save();
        }
    });
}

function updatePerformanceData(id, field, value) {
    return Survey.findOne({id_student: id}).then(survey => {
        if (survey) {
            survey.performance[field] = value;
            return survey.save();
        }
    });
}

function updateExpectationsData(id, field, value) {
    return Survey.findOne({id_student: id}).then(survey => {
        if (survey) {
            survey.expectations[field] = value;
            return survey.save();
        }
    });
}
function updateSocialData(id, field, value) {
    return Survey.findOne({id_student: id}).then(survey => {
        if (survey) {
            survey.social[field] = value;
            return survey.save();
        }
    });
}