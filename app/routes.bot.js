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

router.get('/bot/test', function () {

    res.send({
        "messages": [
            {
                "text":  "Did you enjoy the last game of the CF Rockets?",
                "quick_replies": [
                    {
                        "title":"ITCH II",
                        "block_name": "full_name"
                    },
                    {
                        "title":"ITCH",
                        "url": "https://rockets.chatfuel.com/api/sad-match",
                        "type":"json_plugin_url"
                    }
                ]
            }
        ]
    });

});

/*
    DESEMPEÑO EN EL TRABAJO RELACIONADO CON LA FORMACION RECIBIDA
    ---- PERFORMANCE -----
*/

router.get('/bot/performance/data', performanceController.registerData);

// Esta ruta sera la que manejara el mensaje del block Default answer para en caso de un error con el servidor
// se encargara de redirigir al usuario de nuevo al bloque donde se quedo
//router.get('/bot/error');

module.exports = router;