const express         = require('express');
const router          = express.Router();
const homeController  = require('./controllers/home.controller');
const schoolControler = require('./controllers/school.controller');
const userController  = require('./controllers/user.controller');
const School          = require('./models/school.model');
const slugify         = require('./utils/slugify');

const botController = require('./controllers/bot.controller.js');

router.get('/', homeController.showHome);

router.get('/api/school', schoolControler.getSchools);
router.post('/api/school', schoolControler.postSchool);
router.get('/api/school/:name', schoolControler.getOneSchool);

router.get('/api/user', userController.getUsers);
router.get('/api/user/:id', userController.getOneUser);
router.post('/api/user', userController.postUser);

router.post('/bot/start', botController.registerUser);

router.post('/post', function (req, res) {
    var jsonResponse = [];
    console.log('Body');
    console.log(req.body);
    jsonResponse.push({"text": "Hola. " + (Math.random() * 5 + 1).toFixed(0) + " es tu numero de la suerte..."});
    res.send(jsonResponse);
});



router.post('/school', function (req, res) {
    var jsonResponse = [];

    var jsonOp = {
        "messages": [
            {
                "attachment": {
                    "type":    "template",
                    "payload": {
                        "template_type": "button",
                        "text":          "Hello!",
                        "buttons":       [
                            {
                                "type":       "show_block",
                                "block_name": "Fecha Graduacion",
                                "title":      "Show the block!"
                            },
                            {
                                "type":  "web_url",
                                "url":   "http://www.itchihuahuaii.edu.mx",
                                "title": "Buy Item"
                            }
                        ]
                    }
                }
            }
        ]
    }


    var fistName = 'first name';
    //jsonResponse.push({ "text": "Hola " + req.body[fistName]  + "asi que eres del " + req.body.school });

    console.log(req.body);

    School.findOne({'nicks.name': req.body.school})
        .then((result) => {
            console.log(req.body.school);
            console.log(result);
            if (result) {
                res.send(
                    {
                        "messages": [
                            {"text": "Asi que eres del " + result.name},
                            {
                                "attachment": {
                                    "type":    "template",
                                    "payload": {
                                        "template_type": "button",
                                        "text":          "Es correcto la informacion?",
                                        "buttons":       [
                                            {
                                                "type":       "show_block",
                                                "block_name": "Fecha Graduacion",
                                                "title":      "Si"
                                            },
                                            {
                                                "type":       "show_block",
                                                "block_name": "USER Input",
                                                "title":      "No"
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                );
            }

            res.send({
                "messages": [
                    {"text": "Lo sentimos tu escuela no se encuentra registrada"},
                    {
                        "attachment": {
                            "type":    "template",
                            "payload": {
                                "template_type": "button",
                                "text":          "Puedes volver a ingresar la informacion",
                                "buttons":       [
                                    {
                                        "type":       "show_block",
                                        "block_name": "USER Input",
                                        "title":      "Ok"
                                    }
                                ]
                            }
                        }
                    }
                ]
            });

        })
        .catch((err) => res.send(err));

});

module.exports = router;