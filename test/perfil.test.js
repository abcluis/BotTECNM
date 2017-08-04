const perfil = require('../app/controllers/bot/personal.data.controller');


const chai    = require('chai');
let expect    = chai.expect;
let sinon     = require('sinon');
let httpMocks = require('node-mocks-http');

let chaiHttp = require('chai-http');

chai.use(chaiHttp);

let db = require('../config/db');

describe('Controller Personal Data', function () {

    before(function () {
        db.open();
    });

    it.skip('register user', function (done) {

        let req = httpMocks.createRequest({
            body: {
                'messenger user id': 101010,
                'first name':        'Luis Fernando',
                'last name':         'Gallegos Gonzalez'
            }
        });

        let res = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        perfil.registerUser(req, res);

        res.on('end', function() {
            try {
                let body = res._getData();
                expect(body).to.be.an('object');
                expect(body).to.have.property('messages');
                expect(body.messages).to.be.an('array');
                expect(body.messages[0]).to.have.property('text', 'Hola bienvenido Luis Fernando Gallegos Gonzalez');
                done();
            } catch (e) {
                done(e);
            }
        });

    });


    it('should register valid school', function (done) {
        let req = httpMocks.createRequest({
            query: {
                'messenger user id': 101010,
                'school':            'itch ii'
            }
        });


        let res = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });




        perfil.registerSchool(req, res);


        res.on('end', function() {
            try {
                let body = res._getData();
                expect(body).to.have.property('messages');
                done();
            } catch (e) {
                done(e);
            }
        });

    });

    after(function () {
        db.close();
    })

});
