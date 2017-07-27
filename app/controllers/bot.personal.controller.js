/**
 * Created by usuario1 on 6/21/2017.
 */

const userService   = require('../services/user.service');
const surveyService = require('../services/survey.service');
const School        = require('../models/school.model');
const blocks        = require('../utils/blocks.constants');
const nextBlock     = require('../utils/blocks.order');

const templates = require('../templates');

let BodyCF   = templates.bodyChat;
let TextCF   = templates.textChat;
let CardCF   = templates.cardChat;
let ButtonCF = templates.buttonBlockChat;

let user_id = 'messenger user id';
let HOME    = blocks.BLOCK_QUALITY_TEACHERS;

module.exports = {
    registerUser:         registerUser,
    registerSchool:       registerSchool,
    registerPersonalData: registerPersonalData
};

function registerUser(req, res) {

    let firstName = 'first name';
    let lastName  = 'last name';



    let user = {
        name: `${req.body[firstName]} ${req.body[lastName]}`,
        id:   req.body[user_id]
    };



    surveyService.findOneSurvey(req.body[user_id])
        .then((survey) => {
            if (!survey) {
                return surveyService.createSurvey({id_student: req.body[user_id]});
            }
        });


    userService.findOneOrCreate(user)
        .then((data) => {
            let response = new BodyCF();
            let text     = new TextCF('Hola bienvenido ' + data.name);
            let card     = new CardCF('Esto es una encuesta de los egresados gracias por tu participacion');
            let btn1     = new ButtonCF('Desde el inicio', HOME);
            if (data.last_block) {
                let btn2 = new ButtonCF('Desde la ultima vez', data.last_block);
                card.addButton(btn2);
            }
            card.addButton(btn1);

            response.add(text);
            response.add(card);
            res.send(response.content);
        })
        .catch((err) => {
            console.log(err);
        });

}

function registerSchool(req, res) {



    School.findOne({'nicks.name': req.query.school})
        .then((result) => {
            if (result) {
                let body   = new templates.bodyChat();
                let card   = new templates.cardChat('Asi que eres del ' + result.name);
                let btnYes = new templates.buttonBlockChat('Yes', blocks.BLOCK_FULL_NAME);
                let btnNo  = new templates.buttonBlockChat('No', blocks.BLOCK_SCHOOL);
                card.addButton(btnYes);
                card.addButton(btnNo);
                body.add(card);


                res.send(body.content);
            } else {
                let body  = new templates.bodyChat();
                let card  = new templates.cardChat('Tu escuela no se encuentra registrada, puedes ingresar de nuevo la informacion');
                let btnOk = new templates.buttonBlockChat('OK', blocks.BLOCK_SCHOOL);
                card.addButton(btnOk);
                body.add(card);
                res.send(body.content);
            }
        })
        .catch((err) => res.send(err));
}

function registerPersonalData(req, res) {
    let keys = Object.keys(req.query);

    // id   field   value
    let id    = req.query[user_id];
    let field = keys[1];
    let value;
    value     = req.query[field];


    let user = {
        id:         id,
        last_block: nextBlock(field)
    };


    // Metodo para detectar si es el campo package_comp y por tanto cambiar el body a un arreglo
    if (field === 'package_comp') {
        let arreglo = req.query[field].split(',');
        value       = arreglo.map(function (item, index) {
            return {
                name: item
            }
        });
    }

    let confirm = req.body[field];

    userService.updateLastBlock(user)
        .then((data) => {
            return surveyService.updatePersonalData(id, field, value);
        })
        .then((survey) => {

            let body = new BodyCF();
            let text = new TextCF('La siguiente pregunta es : ');
            body.add(text);
            body.content.redirect_to_blocks = [];
            body.content.redirect_to_blocks.push(nextBlock(field));
            res.send(body.content);
        })
        .catch((err) => res.send(err));
}
