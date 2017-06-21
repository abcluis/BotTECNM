var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(require('./app/routes'));


var port = process.env.PORT || 3000;


mongoose.connect('mongodb://admin:admin@ds133582.mlab.com:33582/bottecnm', function(err){
    if(err) 
        throw err;
    console.log('Connected to BotTECNM db');
})


app.listen(port, function(err) {
    if(err) throw err;
    console.log(`Chatfuel Bot-Server listening on port ${port}...`);
});