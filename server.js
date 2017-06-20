var express = require('express');
var app = express();

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
    console.log(req);
    jsonResponse.push({ "text": "Hola. " + (Math.random() * 5 + 1).toFixed(0) + " es tu numero de la suerte..." });
    res.send(jsonResponse);
})