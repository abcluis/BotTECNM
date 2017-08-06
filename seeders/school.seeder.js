/**
 * Created by usuario1 on 8/4/2017.
 */

let mongoose     = require('mongoose');
let School       = require('../app/models/school.model');
let schools      = require('./schools.json');
mongoose.Promise = global.Promise;

// LOCAL

//let uri = 'localhost:27017/tecnm';
let uri = 'mongodb://admin:admin@ds133582.mlab.com:33582/bottecnm';


mongoose.connect(uri, function (err) {
    if (err)
        throw err;
    console.log('Connected to BotTECNM db');
});

for (let i = 0; i < schools.length; i++) {
    let temp = new School(schools[i]);
    temp.save();
}

/*
    node seeders/school.seeder.js
 */





