const express               = require('express');
const router                = express.Router();
const homeController        = require('./controllers/home.controller');
const schoolControler       = require('./controllers/school.controller');
const userController        = require('./controllers/user.controller');
const botController         = require('./controllers/bot.personal.controller.js');
const botPertContoller      = require('./controllers/bot.pertinence.controller');
const botJobLocatController = require('./controllers/bot.job.location.controller');
router.get('/', homeController.showHome);

router.get('/api/school', schoolControler.getSchools);
router.post('/api/school', schoolControler.postSchool);
router.get('/api/school/:name', schoolControler.getOneSchool);

router.get('/api/user', userController.getUsers);
router.get('/api/user/:id', userController.getOneUser);
router.post('/api/user', userController.postUser);

router.post('/bot/start', botController.registerUser);
router.post('/bot/school', botController.registerSchool);
router.post('/bot/personal/data', botController.registerPersonalData);
//router.post('/bot/test', botController.registerPackages);


// PERTINENCIA Y DISPONIBILIDAD DE MEDIOS
router.post('/bot/pertinence/init', botPertContoller.initPertData);
router.post('/bot/pertinence/data', botPertContoller.registerPertData);

//UBICACION LABORAL
router.post('/bot/joblocation/init', botJobLocatController.initJobLocation);
router.post('/bot/joblocation/data', botJobLocatController.registerJobLocation);


module.exports = router;