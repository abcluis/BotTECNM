var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(require('./app/routes'));


var port = process.env.PORT || 3000;



app.listen(port, function(err) {
    if(err) throw err;
    console.log(`Chatfuel Bot-Server listening on port ${port}...`);
});