const perfil = require('../app/controllers/bot/perfil.controller');


const chai = require('chai');
let expect = chai.expect;
let sinon  = require('sinon');
let httpMocks = require('node-mocks-http');

describe('Perfil Controller Test', function () {

    it('register user', function (done) {

        let req  = httpMocks.createRequest({
            body: {
                'messenger user id': 101010,
                'first name':        'Luis Fernando',
                'last name':         'Gallegos Gonzalez'
            }
        });

        let res= {};
        res.send = function(body) {
            expect(body).to.be.an('object');
            expect(body).to.have.property('messages');
            expect(body.messages).to.be.an('array');
            expect(body.messages[0]).to.have.property('text','Hola bienvenido Luis Fernando Gallegos');
            done();
        };

        perfil.registerUser(req,res);
    });

    
    it('should register valid school', function (done) {
        let req  = httpMocks.createRequest({
            query: {
                'messenger user id': 101010,
                'school':        'itch ii'
            }
        });

        let res= {};
        res.send = function (body) {
            expect(body).to.have.property('messages');
            expect(body.messages).to.be.an('array');
            expect(body.messages).to.be.an('array');
            expect(body.messages[0]).to.be.an('object');
            expect(body.messages[0]).to.have.property('attachment');

            done();
        };

        perfil.registerSchool(req,res);
    })

});
