const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const rp = require('request-promise');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(require('./app/routes'));


let port = process.env.PORT || 3000;


mongoose.connect('mongodb://admin:admin@ds133582.mlab.com:33582/bottecnm', function(err){
    if(err) 
        throw err;
    console.log('Connected to BotTECNM db');
});

let schedule = require('node-schedule');
let User = require('./app/models/user.model');
let rule = new schedule.RecurrenceRule();
rule.second = [0, 20, 40];
let j = schedule.scheduleJob('0 * * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    console.log((new Date()).toUTCString());
    let options = {
        method: 'POST',
        uri: 'https://api.chatfuel.com/bots/5941e907e4b07123678c4199/users/1453872458011175/send?chatfuel_token=vnbqX6cpvXUXFcOKr5RHJ7psSpHDRzO1hXBY8dkvn50ZkZyWML3YdtoCnKH7FSjC&chatfuel_block_name=full_name&attrprueba=20',
        json: true // Automatically stringifies the body to JSON
    };

    //rp(options);
});

let url = 'https://api.chatfuel.com/bots/5941e907e4b07123678c4199/users/1453872458011175/send?chatfuel_token=vnbqX6cpvXUXFcOKr5RHJ7psSpHDRzO1hXBY8dkvn50ZkZyWML3YdtoCnKH7FSjC&chatfuel_block_name=full_name&attrprueba=20';


app.listen(port, function(err) {
    if(err) throw err;
    console.log(`Chatfuel Bot-Server listening on port ${port}...`);
});