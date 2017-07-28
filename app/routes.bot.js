const express = require('express');
const router  = express.Router();

const botController         = require('./controllers/bot.personal.controller.js');
const botPertContoller      = require('./controllers/bot.pertinence.controller');
const botJobLocalController = require('./controllers/bot.job.location.controller');
const validations           = require('./middlewares/validations');
const validationsErrors     = require('./middlewares/validations.errors.js');
const surveyCreated         = require('./middlewares/surveyCreated');

router.use(validations);
router.use(validationsErrors);
router.use(surveyCreated);


router.post('/bot/start', botController.registerUser);
router.get('/bot/school', botController.registerSchool);
router.get('/bot/personal/data', botController.registerPersonalData);

// PERTINENCIA Y DISPONIBILIDAD DE MEDIOS
router.post('/bot/pertinence/init', botPertContoller.initPertData);
router.get('/bot/pertinence/data', botPertContoller.registerPertData);

//UBICACION LABORAL
router.post('/bot/joblocation/init', botJobLocalController.initJobLocation);
router.get('/bot/joblocation/data', botJobLocalController.registerJobLocation);

module.exports = router;