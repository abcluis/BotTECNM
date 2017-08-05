/**
 * Created by usuario1 on 6/21/2017.
 */

const userService   = require('../../services/user.service');
const surveyService = require('../../services/survey.service');
const School        = require('../../models/school.model');
const blocks        = require('../../utils/blocks.constants');
const nextBlock     = require('../../utils/blocks.order');
const handleErrors  = require('../../utils/handle.errors');
const templates     = require('../../templates');

let messages = require('../../utils/messages.bot');

let BodyCF   = templates.bodyChat;
let TextCF   = templates.textChat;
let CardCF   = templates.cardChat;
let ButtonCF = templates.buttonBlockChat;
let QuickCF  = templates.quickChat;

let user_id = 'messenger user id';
let HOME    = blocks.BLOCK_SCHOOL;

module.exports = {
    registerUser:         registerUser,
    registerSchool:       registerSchool,
    registerPersonalData: registerPersonalData,
    responseSchool:       responseSchool
};

function registerUser(req, res) {

    let firstName = 'first name';
    let lastName  = 'last name';


    let user = {
        name: `${req.body[firstName]} ${req.body[lastName]}`,
        id:   req.body[user_id]
    };

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

    let id = req.query['messenger user id'];
    let state = req.query.school;

    School.find({state: state})
        .then(function (schools) {


            if (schools.length === 0) {


                let body = new BodyCF();
                let text = new TextCF(messages.schoolsNotFound);

                body.add(text);
                body.content.redirect_to_blocks = [];
                body.content.redirect_to_blocks.push(blocks.BLOCK_SCHOOL);
                res.send(body.content);

            } else {

                let body = new BodyCF();
                let text = new TextCF('Selecciona tu instituto');
                body.add(text);
                for (let i in schools) {
                    let uri   = "https://peaceful-mesa-57140.herokuapp.com/bot/school/response?" + encodeURIComponent('messenger user id=' + id + '&school=' + schools[i].name);
                    let quick = new QuickCF(schools[i].nick, uri);
                    body.addQuick(quick);
                }


                res.send(body.content);
            }


        })
        .catch((function (err) {
            res.send({
                "messages": [
                    {
                        "text": err.message
                    }
                ]
            })
        }));
}


function responseSchool(req, res) {

    let school = req.query.school;
    let id     = req.query['messenger user id'];

    surveyService.findOneSurvey(id)
        .then(function (survey) {
            survey.school = school;
            return survey.save();
        })
        .then(function (survey) {
            let body   = new BodyCF();
            let card   = new CardCF('Asi que eres del ' + school);
            let btnYes = new ButtonCF('Yes', blocks.BLOCK_FULL_NAME);
            let btnNo  = new ButtonCF('No', blocks.BLOCK_SCHOOL);
            card.addButton(btnYes);
            card.addButton(btnNo);
            body.add(card);
            res.send(body.content);
        })
        .catch(function (err) {
            res.send(err);
        });


}


function registerPersonalData(req, res) {
    let keys = Object.keys(req.query);

    // id   field   value
    for (let i in req.query) {
        console.log(i);
    }
    let id    = req.query[user_id];
    let field = keys[1];
    let value = req.query[field];

    // Metodo para detectar si es el campo package_comp y por tanto cambiar el body a un arreglo
    if (field === 'package_comp') {
        let arreglo = req.query[field].split(',');

        value = arreglo.map(function (item) {
            return {
                name: item
            }
        });
    }


    surveyService.updatePersonalData(id, field, value)
        .then((survey) => {

            let body = new BodyCF();
            let text = new TextCF('La siguiente pregunta es : ');
            body.add(text);
            body.content.redirect_to_blocks = [];
            body.content.redirect_to_blocks.push(nextBlock(field));
            res.send(body.content);
        })
        .catch(function (err) {
            handleErrors(err, res, field);
        });
}
