var express = require('express');
var router = express.Router();
var homeController = require('./controllers/home.controller');


router.get('/', homeController.showHome);

router.post('/post', function(req,res){
    var jsonResponse = [];
    console.log('Body');
    console.log(req.body);
    jsonResponse.push({ "text": "Hola. " + (Math.random() * 5 + 1).toFixed(0) + " es tu numero de la suerte..." });
    res.send(jsonResponse);
})

router.post('/school', function(req,res){
    var jsonResponse = [];
    console.log('Escuela');
    console.log(req.body);
    var fistName = 'first name';
    jsonResponse.push({ "text": "Hola " + req.body[fistName]  + "asi que eres del " + req.body.school });
    res.send(jsonResponse);
})

module.exports = router;