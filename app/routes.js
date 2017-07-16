const express          = require('express');
const router           = express.Router();
const homeController   = require('./controllers/home.controller');
const schoolControler  = require('./controllers/school.controller');
const userController   = require('./controllers/user.controller');
const botController    = require('./controllers/bot.personal.controller.js');
const botPertContoller = require('./controllers/bot.pertinence.controller');
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

// PERTINENCIA Y DISPONIBILIDAD DE MEDIOS
router.post('/bot/pertinence/data', botPertContoller.registerPertData);

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
            "personal_data": {
                "full_name" : "Luis Gallegos",
                "control_number" : 13550370,
                "birthdate" : "30 08 95",
                "curp" : "GAGASDSADDASQEW",
                "gender" : "Masculino",
                "civil_status" : "Soltero",
                "address" : "Avenida siempre viva",
                "city" : "Chihuahua",
                "municipality" : "Chihuahua",
                "state" : "Chihuahua",
                "phone" : 6143213212,
                "email" : "abc_luis30@hotmail.com",
                "phone_alt" : 6142032021,
                "career_speciality" : "Sistemas y Moviles",
                "month_graduate" : "Agosto 2018",
                "certificated" : true,
                "english_mastery" : "80%",
                "other_mastery" : "0%",
                "package_comp" : [
                    {"name" : "SQL"},
                    {"name" : "JAVA"},
                    {"name" : "WORD"},
                ]
            },
            "pertinence": {
                "quality_teachers" : "Buena",
                "study_plan" : "Buena",
                "oportunity_part" : "Buena",
                "emphasis_invest" : "Buena",
                "satisfaction_cond" : "Buena",
                "experience_residence" : "Buena",
            },
            "work_aspect": {
                "currently" : "trabaja",
                "study" : {
                    "type" : "Maestria",
                    "speciality" : "Sistemas"
                },
                "work" : {
                    "time_get" : "Mas de 6 meses",
                    "how_get" : "Contactos personales",
                    "requeriments" : [
                        {"description" : "Ingles"}
                        {"description" : "Java"}
                        {"description" : "SQL"}
                    ],
                    "language_use" : "Ingles",
                    "speak_language" : "Mucho",
                    "write_language" : "Mucho",
                    "read_language" : "Mucho",
                    "listen_language" : "Mucho",
                    "old_job" : "3 Años",
                    "salary" : 15000,
                    "level_job" : "Supervisor",
                    "work_condition" : "Contrato",
                    "work_study_relation" : "80%",
                    "organism" : "Publico",
                    "main_activity_company" : "Software"

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