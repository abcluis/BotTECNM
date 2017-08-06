const express = require('express');
const router  = express.Router();

const personalDataController = require('./controllers/bot/personal.data.controller.js');
const botPertContoller       = require('./controllers/bot/bot.pertinence.controller');
const botJobLocalController  = require('./controllers/bot/bot.job.location.controller');
const performanceController  = require('./controllers/bot/performance.controller');

// -------- Middlewares --------
const validations       = require('./middlewares/validations');
const validationsErrors = require('./middlewares/validations.errors.js');
const surveyCreated     = require('./middlewares/surveyCreated');
const recordUser        = require('./middlewares/record');


router.get('/bot/test', function (req, res) {

    res.send({
        "messages": [
            {
                "attachment":{
                    "type":"template",
                    "payload":{
                        "template_type":"list",
                        "top_element_style":"large",
                        "elements":[
                            {
                                "title":"Chatfuel Rockets T-Shirt",
                                "image_url":"http://rockets.chatfuel.com/img/shirt.png",
                                "subtitle":"Soft white cotton t-shirt with CF Rockets logo",
                                "buttons":[
                                    {
                                        "type":"web_url",
                                        "url":"https://rockets.chatfuel.com/store/shirt",
                                        "title":"View Item"
                                    }
                                ]
                            },
                            {
                                "title":"Chatfuel Rockets Hoodie",
                                "image_url":"http://rockets.chatfuel.com/img/hoodie.png",
                                "subtitle":"Soft gray cotton t-shirt with CF Rockets logo",
                                "buttons":[
                                    {
                                        "type":"web_url",
                                        "url":"https://rockets.chatfuel.com/store/hoodie",
                                        "title":"View Item"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ]
    });

});

router.use(validations);
router.use(validationsErrors);
router.use(surveyCreated);
router.use(recordUser);


// router.get('/bot/resume', resumeController)

router.post('/bot/start', personalDataController.registerUser);
router.get('/bot/school', personalDataController.registerSchool);
router.get('/bot/school/response', personalDataController.responseSchool);
router.get('/bot/personal/data', personalDataController.registerPersonalData);

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