/**
 * Created by usuario1 on 7/28/2017.
 */
/*
    Asegura que el usuario tenga una encuesta asignada al entrar a cualquier ruta
 */

let SurveyService = require('../services/survey.service');

function surveyCreated(req, res, next) {

    let id = req.query['messenger user id'];

    SurveyService.findOneSurvey(id)
        .then(result)
        .catch((err) => res.send(err));

    function result(data) {
        if(data) {
            next();
        }else {
            SurveyService.createSurvey({id_student: id})
                .then(create);
        }
    }

    function create() {
        next();
    }

}

module.exports = surveyCreated;