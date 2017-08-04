/**
 * Created by usuario1 on 8/4/2017.
 */

let chai     = require('chai');
let chaiHttp = require('chai-http');
let expect   = chai.expect;

chai.use(chaiHttp);

let app       = 'http://localhost:3000';
let db        = require('../config/db');
let Survey    = require('../app/models/survey.model');
let messages  = require('../app/utils/messages.bot');
let nextBlock = require('../app/utils/blocks.order');

describe('Route School' , function () {

    it('Should return the options to select the school', function () {



    });

});

