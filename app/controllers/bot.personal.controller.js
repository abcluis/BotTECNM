/**
 * Created by usuario1 on 6/21/2017.
 */

const userService = require('../services/user.service');
const surveyService = require('../services/survey.service');
const School          = require('../models/school.model');
const templates = require('../templates');
const blocks = require('../utils/blocks.constants');

module.exports = {
    registerUser : registerUser,
    registerSchool: registerSchool,
    registerControl: registerControl
};

function registerUser(req,res) {
    let user_id = 'messenger user id';
    let firstName = 'first name';
    let lastName = 'last name';

    let userBody = {
        name : req.body[firstName] + ' ' + req.body[lastName],
        id : req.body[user_id]
    };

    surveyService.findOneSurvey(req.body[user_id])
        .then((survey) => {
            if(!survey){
                return surveyService.createSurvey({id_student : req.body[user_id]});
            }
        });




    userService.findOneUser(req.body[user_id])
        .then((user) => {
            if(user){
                
                let response = new templates.bodyChat();
                let text = new templates.textChat('Hola bienvenido de nuevo ' + user.name);  
                let card = new templates.cardChat('Vamos a continuar con la encuesta');
                let btn1 = new templates.buttonBlockChat('OK',blocks.BLOCK_SCHOOL);
                let btn2 = new templates.buttonBlockChat('Desde fecha egreso', blocks.BLOCK_DATEGRAD);
                card.addButton(btn1);
                card.addButton(btn2);
                response.add(text);
                response.add(card);
                res.send(response.content);
            }else {
                return userService.createUser(userBody);
            }
        })
        .then((user) => {
            if(user){
                let response = new templates.bodyChat();
                let text = new templates.textChat('Hola bienvenido ' + user.name);  
                let card = new templates.cardChat('Esto es una encuesta de los egresados gracias por tu participacion, empezemos');
                let btn1 = new templates.buttonBlockChat('OK',blocks.BLOCK_SCHOOL);
                card.addButton(btn1);
                response.add(text);
                response.add(card);
                
                res.send(response.content);
            }else {

            }
            
        })
        .catch((err) => res.send(err));
}

function registerSchool(req,res){


    School.findOne({'nicks.name': req.body.school})
        .then((result) => {
            if (result) {
                let body = new templates.bodyChat();
                let card = new templates.cardChat('Asi que eres del ' + result.name);
                let btnYes = new templates.buttonBlockChat('Yes', blocks.BLOCK_FULL_NAME);
                let btnNo = new templates.buttonBlockChat('No', blocks.BLOCK_SCHOOL);
                card.addButton(btnYes);
                card.addButton(btnNo);
                body.add(card);
                console.log(body.content);
                res.send(body.content);
                
            }else {
                let body = new templates.bodyChat();
                let card = new templates.cardChat('Tu escuela no se encuentra registrada, puedes ingresar de nuevo la informacion');
                let btnOk = new templates.buttonBlockChat('OK', blocks.BLOCK_SCHOOL);

                card.addButton(btnOk);
                body.add(card);
                res.send(body.content);
            }
        })
        .catch((err) => res.send(err));
}

function registerControl(req,res) {

}
