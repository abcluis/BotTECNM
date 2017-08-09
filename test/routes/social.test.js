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

describe('Routes social', function () {

    before(function () {
        db.open();
    });

    beforeEach(function () {
        return Survey.remove({id_student : 101010});
    });

    it('Should return a redirect to what orgs if belongs a orgs is true and save belongs orgs in survey model', function () {
        return chai.request(app)
            .get('/bot/social/boolean?messenger user id=101010&belongs_orgs=Si')
            .then(function (res) {

                let expected = new templates.generic()
                    .addText('Perfecto avancemos a la siguiente pregunta')
                    .addRedirect(blocks.BLOCK_WHAT_ORGS)
                    .get();
                expect(res.body).to.deep.equal(expected);
                // Verificar que se guarde en el survey model la respuesta
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                expect(survey.social).to.have.property('belongs_orgs', true);
            })
            .catch(function (err) {
                throw err;
            })
    });
    it('Should return a redirect to belongs a pro orgs if belongs a orgs is false and save belongs orgs in survey model', function () {
        return chai.request(app)
            .get('/bot/social/boolean?messenger user id=101010&belongs_orgs=No')
            .then(function (res) {

                let expected = new templates.generic()
                    .addText('Perfecto avancemos a la siguiente pregunta')
                    .addRedirect(blocks.BLOCK_BELONGS_PRO_ORGS)
                    .get();
                expect(res.body).to.deep.equal(expected);
                // Verificar que se guarde en el survey model la respuesta
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                expect(survey.social).to.have.property('belongs_orgs', false);
            })
            .catch(function (err) {
                throw err;
            })
    });

    it('Should return a redirect to what pro orgs if belongs a pro orgs is true and save belongs pro orgs in survey model', function () {
        return chai.request(app)
            .get('/bot/social/boolean?messenger user id=101010&belongs_pro_orgs=Si')
            .then(function (res) {

                let expected = new templates.generic()
                    .addText('Perfecto avancemos a la siguiente pregunta')
                    .addRedirect(blocks.BLOCK_WHAT_PRO_ORGS)
                    .get();
                expect(res.body).to.deep.equal(expected);
                // Verificar que se guarde en el survey model la respuesta
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                expect(survey.social).to.have.property('belongs_pro_orgs', true);
            })
            .catch(function (err) {
                throw err;
            })
    });

    it('Should return a redirect to belongs a associations if belongs a pro orgs is false and save belongs pro orgs in survey model', function () {
        return chai.request(app)
            .get('/bot/social/boolean?messenger user id=101010&belongs_pro_orgs=No')
            .then(function (res) {

                let expected = new templates.generic()
                    .addText('Perfecto avancemos a la siguiente pregunta')
                    .addRedirect(blocks.BLOCK_BELONGS_ASSOCIATION)
                    .get();
                expect(res.body).to.deep.equal(expected);
                // Verificar que se guarde en el survey model la respuesta
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                expect(survey.social).to.have.property('belongs_pro_orgs', false);
            })
            .catch(function (err) {
                throw err;
            })
    });


    after(function () {
        db.close();
    });

});
