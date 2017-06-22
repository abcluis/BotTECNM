const express         = require('express');
const router          = express.Router();
const homeController  = require('./controllers/home.controller');
const schoolControler = require('./controllers/school.controller');
const userController  = require('./controllers/user.controller');
const School          = require('./models/school.model');
const slugify         = require('./utils/slugify');
const botController   = require('./controllers/bot.controller.js');

router.get('/', homeController.showHome);

router.get('/api/school', schoolControler.getSchools);
router.post('/api/school', schoolControler.postSchool);
router.get('/api/school/:name', schoolControler.getOneSchool);

router.get('/api/user', userController.getUsers);
router.get('/api/user/:id', userController.getOneUser);
router.post('/api/user', userController.postUser);

router.post('/bot/start', botController.registerUser);
router.post('/bot/school', botController.registerSchool);

router.post('/post', function (req, res) {
    var jsonResponse = [];
    console.log('Body');
    console.log(req.body);
    jsonResponse.push({"text": "Hola. " + (Math.random() * 5 + 1).toFixed(0) + " es tu numero de la suerte..."});
    res.send(jsonResponse);
});


    /*

    encuesta  = [
        {
            "id_alumno" : 2831123129021
            "escuela" : "Instituto Tecnologico Chihuahua II",
            "informacion": {
                "egreso" : 2010,
                "promedio" : 90.22,
                "trabajo" : {
                    "posee" : true,
                    "lugar" : "TGC",
                    "puesto" : "programador junior",
                    "antiguedad" : 2,
                    "salario" : 10000
                }
            }
        },
         {
         "escuela" : "Instituto Tecnologico Chihuahua II",
         "informacion": {
             "egreso" : 2010,
             "promedio" : 90.22,
             "trabajo" : {
                 "posee" : true,
                 "lugar" : "TGC",
                 "puesto" : "programador junior",
                 "antiguedad" : 2,
                 "salario" : 10000
                }
            }
         }
    ]

     */



module.exports = router;