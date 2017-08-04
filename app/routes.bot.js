const express = require('express');
const router  = express.Router();

const perfilController      = require('./controllers/bot/personal.data.controller.js');
const botPertContoller      = require('./controllers/bot/bot.pertinence.controller');
const botJobLocalController = require('./controllers/bot/bot.job.location.controller');
const resumeController      = require('./controllers/bot/resume.controller');
const performanceController = require('./controllers/bot/performance.controller');

// -------- Middlewares --------
const validations       = require('./middlewares/validations');
const validationsErrors = require('./middlewares/validations.errors.js');
const surveyCreated     = require('./middlewares/surveyCreated');
const recordUser        = require('./middlewares/record');


let School = require('./models/school.model');
let messages = require('./utils/messages.bot');

const templates     = require('./templates');

let BodyCF   = templates.bodyChat;
let TextCF   = templates.textChat;
let CardCF   = templates.cardChat;
let ButtonCF = templates.buttonBlockChat;
let QuickCF = templates.quickChat;

let blocks = require('./utils/blocks.constants');

router.get('/bot/test', function (req,res) {

    let state = req.query.testing;

    School.find({state : state})
        .then(function (schools) {



            if(schools.length === 0){



                let body = {
                    "messages": [
                        {
                            "text":  messages.schoolsNotFound
                        }
                    ],
                    "redirect_to_blocks" : [ 'testing' ]
                };

                res.send(body);

            }else {

                let body = new BodyCF();
                let text = new TextCF('Selecciona tu instituto');
                body.add(text);
                for(let i in schools){
                    let uri = "https://peaceful-mesa-57140.herokuapp.com/bot/test2/school?test=" + encodeURIComponent(schools[i].name);
                    let quick = new QuickCF(schools[i].nick, uri);
                    body.addQuick(quick);
                }


                res.send(body.content);
            }





        })
        .catch((function (err) {
            res.send({
                "messages" : [
                    {
                        "text" : err.message
                    }
                ]
            })
        }));

});



router.get('/bot/test2/school' , function (req, res) {

    let school = req.query.test;

    let body = new BodyCF();
    let card = new CardCF('Asi que eres del ' + school);
    let btnYes = new ButtonCF('Yes',blocks.BLOCK_FULL_NAME);
    let btnNo = new ButtonCF('No', blocks.BLOCK_SCHOOL);
    card.addButton(btnYes);
    card.addButton(btnNo);
    body.add(card);

    res.send(body.content);

});


router.use(validations);
router.use(validationsErrors);
router.use(surveyCreated);
router.use(recordUser);

// router.get('/bot/resume', resumeController)

router.post('/bot/start', perfilController.registerUser);
router.get('/bot/school', perfilController.registerSchool);
router.get('/bot/personal/data', perfilController.registerPersonalData);

// PERTINENCIA Y DISPONIBILIDAD DE MEDIOS
router.post('/bot/pertinence/init', botPertContoller.initPertData);
router.get('/bot/pertinence/data', botPertContoller.registerPertData);

//UBICACION LABORAL
router.post('/bot/joblocation/init', botJobLocalController.initJobLocation);
router.get('/bot/joblocation/data', botJobLocalController.registerJobLocation);





/*
    DESEMPEÑO EN EL TRABAJO RELACIONADO CON LA FORMACION RECIBIDA
    ---- PERFORMANCE -----
*/

router.get('/bot/performance/data', performanceController.registerData);

// Esta ruta sera la que manejara el mensaje del block Default answer para en caso de un error con el servidor
// se encargara de redirigir al usuario de nuevo al bloque donde se quedo
//router.get('/bot/error');

module.exports = router;