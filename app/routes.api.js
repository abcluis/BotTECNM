const express = require('express');
const router  = express.Router();

const surveyController      = require('./controllers/survey.controller');
const homeController        = require('./controllers/home.controller');
const schoolControler       = require('./controllers/school.controller');
const userController        = require('./controllers/user.controller');

router.get('/', homeController.showHome);

router.get('/api/school', schoolControler.getSchools);
router.post('/api/school', schoolControler.postSchool);
router.get('/api/school/:name', schoolControler.getOneSchool);
router.post('/api/nick/', schoolControler.addNicks);

router.get('/api/user', userController.getUsers);
router.get('/api/user/:id', userController.getOneUser);
router.post('/api/user', userController.postUser);

router.get('/api/survey', surveyController.index);
router.post('/api/survey', surveyController.store);
router.get('/api/survey/:id', surveyController.show);
router.delete('/api/survey/:id', surveyController.destroy);

module.exports = router;