const express = require('express');
const router  = express.Router();

const perfilController      = require('./controllers/bot/perfil.controller.js');
const botPertContoller      = require('./controllers/bot/bot.pertinence.controller');
const botJobLocalController = require('./controllers/bot/bot.job.location.controller');
const resumeController      = require('./controllers/bot/resume.controller');


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

module.exports = router;