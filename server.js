var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 80;



app.listen(port, function(err) {
    if(err) throw err;
    console.log('Chatfuel Bot-Server listening on port 80...');
});

app.get('/', function(req, res) {
    var jsonResponse = [];
    jsonResponse.push({ "text": "Hi. " + (Math.random() * 5 + 1).toFixed(0) + " is a lucky number..." });
    res.send(jsonResponse);
});

app.post('/post', function(req,res){
    var jsonResponse = [];
    console.log('Body');
    console.log(req.body);
    jsonResponse.push({ "text": "Hola. " + (Math.random() * 5 + 1).toFixed(0) + " es tu numero de la suerte..." });
    res.send(jsonResponse);
})

app.post('/school', function(req,res){
    var jsonResponse = [];
    console.log('Escuela');
    console.log(req.body);
    var fistName = 'first name';
    jsonResponse.push({ "text": "Hola " + req.body[fistName]  + "asi que eres del " + req.body.school });
    res.send(jsonResponse);
})