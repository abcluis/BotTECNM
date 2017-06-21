var express         = require('express');
var router          = express.Router();
var homeController  = require('./controllers/home.controller');
var schoolControler = require('./controllers/school.controller');
const School        = require('./models/school.model');
const slugify = require('./utils/slugify');


router.get('/', homeController.showHome);

router.get('/api/school', schoolControler.getSchools);
router.post('/api/school', schoolControler.postSchool);

router.post('/post', function(req,res){
    var jsonResponse = [];
    console.log('Body');
    console.log(req.body);
    jsonResponse.push({ "text": "Hola. " + (Math.random() * 5 + 1).toFixed(0) + " es tu numero de la suerte..." });
    res.send(jsonResponse);
})

router.post('/school', function(req,res){
    var jsonResponse = [];

    var jsonOp = {
        "messages": [
            {
            "attachment": {
                "type": "template",
                "payload": {
                "template_type": "button",
                "text": "Hello!",
                "buttons": [
                    {
                    "type": "show_block",
                    "block_name": "Fecha Graduacion",
                    "title": "Show the block!"
                    },
                    {
                    "type": "web_url",
                    "url": "http://www.itchihuahuaii.edu.mx",
                    "title": "Buy Item"
                    }
                ]
                }
            }
            }
        ]
    }




    var fistName = 'first name';
    jsonResponse.push({ "text": "Hola " + req.body[fistName]  + "asi que eres del " + req.body.school });

    console.log(req.body);

    School.findOne({name: slugify(req.body.school)})
        .then((result) => {
            console.log(result);
            if(result)
                res.send({ "text": "Hola " + req.body[fistName]  + " tu escuela es: " + result.name });
            res.send({ "text": "Hola " + req.body[fistName]  + " lo sentimos tu escuela no existe" });
     
        })
        .catch((err) => res.send(err));

})

module.exports = router;