/**
 * Created by usuario1 on 7/29/2017.
 */
let chai       = require('chai')
    , chaiHttp = require('chai-http');
let expect     = require('chai').expect;
chai.use(chaiHttp);
let app          = 'http://localhost:3000';
let Survey       = require('../app/models/survey.model');
let mongoose     = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds133582.mlab.com:33582/bottecnm', function (err) {
    if (err)
        throw err;
    console.log('Connected to BotTECNM db');
});

let nextBlock = require('../app/utils/blocks.order');

before(function () {
    return Survey.remove({id_student: 101010})
        .then(() => {
            console.log('Survey eliminado');
        })
        .catch((err) => err);
});

describe('Routes Test', function () {
    it('should send index', function (done) { // <= Pass in done callback
        chai.request(app)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.have.property('body');
                done();
            });

    });

    it('should send all surveys', function (done) {
        chai.request(app)
            .get('/api/survey')
            .end(function (err, res) {
                done();
            })
    });

    it('should return start message in the bot', function (done) {

        chai.request(app)
            .post('/bot/start')
            .send({
                'messenger user id': '101010',
                'first name': 'Luis Fernando',
                'last name': 'Gallegos'
            })
            .end(function (err, res) {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('messages')
                    .that.to.be.an('array');
                expect(res.body.messages).lengthOf(2);
                expect(res.body.messages[0]).to.have.property('text');
                expect(res.body.messages[1]).to.have.property('attachment');
                expect(res.body.messages[0].text.indexOf('Hola bienvenido')).to.equal(0);
                expect(res).to.have.status(200);
                done();
            });

    });

    it('should return the next block of number control', function (done) {
        chai.request(app)
            .get('/bot/personal/data?messenger user id=101010&number_control=10101011')
            .end(function (err, res) {
                expect(res).to.have.property('body');
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('redirect_to_blocks');
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('messages');
                done();
            })
    });

    it('should return the next block of curp', function (done) {
        chai.request(app)
            .get('/bot/personal/data?messenger user id=101010&curp=GAGL950830HCHLNS06')
            .end(function (err, res) {
                expect(res).to.have.property('body');
                expect(res).to.have.status(200);
                expect(res.body).to.have.deep.property('redirect_to_blocks', [nextBlock('curp')]);
                expect(res.body).to.have.property('messages');
                expect(res.body).to.be.an('object');


                done();
            })
    });
    it('should return error in block of curp', function (done) {
        chai.request(app)
            .get('/bot/personal/data?messenger user id=101010&curp=GAGL950830HCHLNS05')
            .end(function (err, res) {

                expect(res).to.have.property('body');
                expect(res).to.have.status(200);
                expect(res.body).to.have.deep.property('redirect_to_blocks', ['curp']);
                expect(res.body).to.have.deep.property('messages', [{
                    text: 'Por favor ingresa una curp valida'
                }]);
                expect(res.body).to.be.an('object');

                done();
            })
    });

    it('should return next block with birthdate', function (done) {
        chai.request(app)
            .get('/bot/personal/data?messenger user id=101010&birthdate=2010-10-30')
            .end(function (err, res) {

                expect(res).to.have.status(200);
                expect(res).to.have.property('body');
                expect(res.body).to.have.deep.property('messages', [{
                    text: 'La siguiente pregunta es : '
                }]);
                expect(res.body).to.have.deep.property('redirect_to_blocks', [nextBlock('birthdate')]);

                done();
            });
    });

    it('should return error in birthdate invalid', function (done) {
        chai.request(app)
            .get('/bot/personal/data?messenger user id=101010&birthdate=2010-10-32')
            .end(function (err, res) {

                expect(res).to.have.status(200);
                expect(res).to.have.property('body');
                expect(res.body).to.have.deep.property('messages', [{
                    text: 'Por favor ingresa la fecha con el formato correcto'
                }]);
                expect(res.body).to.have.deep.property('redirect_to_blocks', ['birthdate']);
                done();
            });
    });

    it('should verify survey recent created', function () {

        return Survey.findOne({id_student: 101010}).exec()
            .then(function (survey) {

                expect(survey).to.be.an('object');
                expect(survey).to.have.property('id_student', '101010');
                expect(survey).to.have.property('personal_data');
                expect(survey.personal_data).to.have.property('number_control', 10101011);
                expect(survey.personal_data).to.have.property('curp', 'GAGL950830HCHLNS06');
                expect(survey.personal_data).to.have.property('birthdate', "2010-10-30");

            })
            .catch((function (err) {
                throw err;
            }));
    });

});
