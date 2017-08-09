let chai     = require('chai');
let chaiHttp = require('chai-http');
let expect   = require('chai').expect;

chai.use(chaiHttp);

let app       = 'http://localhost:3000';
let Survey    = require('../../app/models/survey.model');
let nextBlock = require('../../app/utils/blocks.order');

let templates = require('../../app/templates.test');

let db       = require('../../config/db');
let messages = require("../../app/utils/messages.bot");

let blocks = require('../../app/utils/blocks.constants');

describe('Routes expectations', function () {

    before(function () {
        db.open();
    });

    beforeEach(function () {
        return Survey.remove({id_student : 101010});
    });

    it('Should return a redirect to what courses if courses is Si and save courses in model', function () {
        return chai.request(app)
            .get('/bot/expectations/boolean?messenger user id=101010&courses=Si')
            .then(function (res) {

                let expected = new templates.generic()
                    .addText('Perfecto avancemos a la siguiente pregunta')
                    .addRedirect(blocks.BLOCK_WHAT_COURSES)
                    .get();
                expect(res.body).to.deep.equal(expected);
                // Verificar que se guarde en el survey model la respuesta
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                expect(survey.expectations).to.have.property('courses', true);
            })
            .catch(function (err) {
                throw err;
            })
    });

    it('Should return a redirect to postgraduates if courses is No and save courses in model', function () {
        return chai.request(app)
            .get('/bot/expectations/boolean?messenger user id=101010&courses=No')
            .then(function (res) {

                let expected = new templates.generic()
                    .addText('Perfecto avancemos a la siguiente pregunta')
                    .addRedirect(blocks.BLOCK_POSTGRADUATE)
                    .get();
                expect(res.body).to.deep.equal(expected);
                // Verificar que se guarde en el survey model la respuesta
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                expect(survey.expectations).to.have.property('courses', false);
            })
            .catch(function (err) {
                throw err;
            })
    });

    it('Should return a redirect to what postgraduates if postgraduate is Si and save postgraduate in model', function () {
        return chai.request(app)
            .get('/bot/expectations/boolean?messenger user id=101010&postgraduate=Si')
            .then(function (res) {

                let expected = new templates.generic()
                    .addText('Perfecto avancemos a la siguiente pregunta')
                    .addRedirect(blocks.BLOCK_WHAT_POSTGRADUATE)
                    .get();
                expect(res.body).to.deep.equal(expected);
                // Verificar que se guarde en el survey model la respuesta
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                expect(survey.expectations).to.have.property('postgraduate', true);
            })
            .catch(function (err) {
                throw err;
            })
    });

    it('Should return a redirect to Intro VI if postgraduate is No and save postgraduate in model', function () {
        return chai.request(app)
            .get('/bot/expectations/boolean?messenger user id=101010&postgraduate=No')
            .then(function (res) {

                let expected = new templates.generic()
                    .addText('Perfecto avancemos a la siguiente pregunta')
                    .addRedirect(blocks.BLOCK_INTRO_VI)
                    .get();
                expect(res.body).to.deep.equal(expected);
                // Verificar que se guarde en el survey model la respuesta
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                expect(survey.expectations).to.have.property('postgraduate', false);
            })
            .catch(function (err) {
                throw err;
            })
    });

    it('Should save what courses in model', function () {
        return chai.request(app)
            .get('/bot/expectations/data?messenger user id=101010&what_courses=Programacion')
            .then(function (res) {

                let expected = new templates.generic()
                    .addText('Perfecto avancemos a la siguiente pregunta')
                    .addRedirect(blocks.BLOCK_POSTGRADUATE)
                    .get();
                expect(res.body).to.deep.equal(expected);
                // Verificar que se guarde en el survey model la respuesta
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                expect(survey.expectations).to.have.property('what_courses', 'Programacion');
            })
            .catch(function (err) {
                throw err;
            })
    });

    it('Should save what postgraduates in model', function () {
        return chai.request(app)
            .get('/bot/expectations/data?messenger user id=101010&what_postgraduate=Big data')
            .then(function (res) {

                let expected = new templates.generic()
                    .addText('Perfecto avancemos a la siguiente pregunta')
                    .addRedirect(blocks.BLOCK_INTRO_VI)
                    .get();
                expect(res.body).to.deep.equal(expected);
                // Verificar que se guarde en el survey model la respuesta
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                expect(survey.expectations).to.have.property('what_postgraduate', 'Big data');
            })
            .catch(function (err) {
                throw err;
            })
    });

    after(function () {
        db.close();
    });

});
