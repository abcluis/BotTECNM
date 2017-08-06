/**
 * Created by usuario1 on 6/21/2017.
 */

const userService   = require('../../services/user.service');
const surveyService = require('../../services/survey.service');
const School        = require('../../models/school.model');
const blocks        = require('../../utils/blocks.constants');
let messages        = require('../../utils/messages.bot');
const nextBlock     = require('../../utils/blocks.order');

const handleErrors = require('../../utils/handle.errors');

let templatesOP = require('../../templates.test');

let user_id = 'messenger user id';
let HOME    = blocks.BLOCK_SCHOOL;

module.exports = {
    registerUser:         registerUser,
    registerSchool:       registerSchool,
    registerPersonalData: registerPersonalData,
    responseSchool:       responseSchool,
    registerCareer:       registerCareer
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

            let card = new templatesOP.card();

            let response = card
                .addText('Hola bienvenido ' + data.name)
                .addCard('Esto es una encuesta de los egresados gracias por tu participacion')
                .addButton('Desde la ultima vez', data.last_block)
                .addButton('Desde el inicio', HOME)
                .get();

            res.send(response);
        })
        .catch((err) => {
            handleErrors(err, res);
        });

}

function registerSchool(req, res) {

    let id    = req.query['messenger user id'];
    let state = req.query.actual_state;

    School.find({state: state})
        .then(function (schools) {


            if (schools.length === 0) {


                let generic = new templatesOP.generic();

                let response = generic
                    .addText(messages.schoolsNotFound)
                    .addRedirect(blocks.BLOCK_SCHOOL)
                    .get();

                res.send(response);

            } else {

                let quick = new templatesOP.quick();

                let response = quick
                    .addText('Selecciona tu instituto');

                for (let i in schools) {
                    let uri  = "https://peaceful-mesa-57140.herokuapp.com/bot/school/response?" + encodeURIComponent('messenger user id=' + id) + '&school=' + encodeURIComponent(schools[i].name);
                    response = response
                        .addQuick(schools[i].nick, uri);
                }

                response = response.get();

                res.send(response);
            }


        })
        .catch((function (err) {
            console.log(err);
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

            let card = new templatesOP.card();

            let response = card
                .addCard('Asi que eres del ' + school)
                .addButton('Yes', blocks.BLOCK_FULL_NAME)
                .addButton('No', blocks.BLOCK_SCHOOL)
                .get();

            res.send(response);
        })
        .catch(function (err) {
            res.send(err);
        });


}


function registerCareer(req, res) {


    let id = req.query['messenger user id'];

    surveyService.findOneSurvey(id)
        .then(function (doc) {
            let school = doc.school;
            return School.findOne({name: school});
        })
        .then(function (doc) {

            let list = new templatesOP.list();

            let response = list
                .addList();

            doc.careers.forEach(function (item) {
                response = response
                    .addElement(item.name, "https://peaceful-mesa-57140.herokuapp.com/bot/start");
            });

            response = response.get();

            res.send(response);

        })
        .catch(function (err) {
            res.send(err);
        });


}

function registerPersonalData(req, res) {
    let keys = Object.keys(req.query);

    let id    = req.query[user_id];
    let field = keys[1];
    let value = req.query[field];

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

            let generic = new templatesOP.generic();

            let response = generic
                .addText(messages.nextSentence)
                .addRedirect(nextBlock(field))
                .get();

            res.send(response);

        })
        .catch(function (err) {
            handleErrors(err, res, field);
        });
}
