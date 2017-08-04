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

router.get('/bot/test', function (req,res) {

    let state = req.query.testing;

    School.find({state : state})
        .then(function (schools) {

            let body = {
                "messages": [
                    {
                        "text":  "Selecciona tu instituto",
                        "quick_replies": [

                        ]
                    }
                ]
            };

            for(let i in schools){
                let aux = {
                    "title": schools[i].nick,
                    "url": "https://peaceful-mesa-57140.herokuapp.com/bot/test2/school?test=" + encodeURIComponent(schools[i].name),
                    "type":"json_plugin_url"
                };

                body.messages[0].quick_replies.push(aux);
            }

            if(schools.length === 0){
                body.messages[0].text = 'Lo sentimos no tenemos registrados escuelas para ese estado'
            }

            res.send(body);

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

    console.log('Entrando a la ruta secundaria');
    let school = req.query.test;

    res.send({
        "messages" : [
            {
                "text" : "asi que eres de " + school
            }
        ]
    });

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