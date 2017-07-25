/**
 * Created by usuario1 on 6/22/2017.
 */
const Survey = require("../models/survey.model");

module.exports = {
  findOneSurvey: findOneSurvey,
  createSurvey: createSurvey,
  updatePersonalData: updatePersonalData,
  updatePertinenceData: updatePertinenceData,
  updateJobLocationData: updateJobLocationData,
};

function findOneSurvey(id) {
    return Survey.findOneAndUpdate({ id_student: id },{},{upsert:true});
  //return Survey.findOne({ id_student: id });
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

function updatePertinenceData(id, field, value) {
  return Survey.findOne({ id_student: id }).then(survey =>{
    if (survey){
      survey.pertinence[field] = value;
      return survey.save();
    }
  });
}

function updateJobLocationData(id, field, value) {
  return Survey.findOne({ id_student: id }).then(survey =>{
    if (survey){
      console.log('encontre encuesta');
      survey.work_aspect[field] = value;
      console.log(`value: ${value}`);
      console.log(`field ${field}`);
      console.log(`${survey.work_aspect[field]}`);
      return survey.save();
    }
  });
}