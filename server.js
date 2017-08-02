const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(require('./app/routes'));


let port = process.env.PORT || 3000;

console.log(process.env.NODE_ENV);
console.log('cambiado ...');

mongoose.connect('mongodb://admin:admin@ds133582.mlab.com:33582/bottecnm', function(err){
    if(err) 
        throw err;
    console.log('Connected to BotTECNM db');
});

require('./app/job/remember');

let url = 'https://api.chatfuel.com/bots/5941e907e4b07123678c4199/users/1453872458011175/send?chatfuel_token=vnbqX6cpvXUXFcOKr5RHJ7psSpHDRzO1hXBY8dkvn50ZkZyWML3YdtoCnKH7FSjC&chatfuel_block_name=full_name&attrprueba=20';


app.listen(port, function(err) {
    if(err) throw err;
    console.log(`Chatfuel Bot-Server listening on port ${port}...`);
});