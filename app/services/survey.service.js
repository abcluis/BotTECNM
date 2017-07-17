/**
 * Created by usuario1 on 6/22/2017.
 */
const Survey = require("../models/survey.model");

module.exports = {
  findOneSurvey: findOneSurvey,
  createSurvey: createSurvey,
  updatePersonalData: updatePersonalData,
  updatePertinenceData: updatePertinenceData,
  updatePackageComp: updatePackageComp
};

function findOneSurvey(id) {
  return Survey.findOne({ id_student: id });
}

function createSurvey(body) {
  let survey = new Survey(body);
  return survey.save();
}

function updatePersonalData(id, field, value) {
  return Survey.findOne({ id_student: id }).then(survey => {
    if (survey) {
      survey.personal_data[field] = value;
      return survey.save();
    }
  });
}

function updatePackageComp(id, values) {

  console.log('update package');

  return Survey.findOne({ id_student : id})
    .then(survey => {
      survey.personal_data.package_comp = values;
      console.log('surve actual');
      console.log(survey);
      return survey.save();
    });
}

function updatePertinenceData(id, field, value) {
  return Survey.findOne({ id_student: id }).then(survey =>{
    if (survey){
      survey.pertinence[field] = value;
      return survey.save();
    }
  });
}