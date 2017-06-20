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
                    "block_name": "some block name",
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
    res.send(jsonOp);
})

module.exports = router;