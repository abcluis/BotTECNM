/**
 * Created by usuario1 on 8/2/2017.
 */

let chai     = require('chai');
let chaiHttp = require('chai-http');
let expect   = require('chai').expect;

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
describe('Routes pertinence', function () {

    beforeEach(function () {
        return Survey.remove({id_student : 101010});
    });

    it('Route init', function (done) {
        chai.request(app)
            .post('/bot/pertinence/init')
            .end(function (err, res) {

                expect(res).to.have.property('body');
                expect(res.body).to.be.an('object');
                expect(res.body.messages).to.be.an('array');
                expect(res.body.messages[0]).to.have.property('attachment');
                done();

            })
    });

    let routes = [
        {
            describe : 'Route quality_teachers',
            field: 'quality_teachers',
            value_valid : 'Muy buena',
            value_invalid : 'buenos'
        },
        {
            describe : 'Route study_plan',
            field: 'study_plan',
            value_valid : 'Muy bueno',
            value_invalid : '80'
        },
        {
            describe : 'Route oportunity_part',
            field: 'oportunity_part',
            value_valid : 'Buena',
            value_invalid : 20
        },
        {
            describe : 'Route emphasis_invest',
            field: 'emphasis_invest',
            value_valid : 'Mala',
            value_invalid : 40 + ' hola'
        },
        {
            describe : 'Route satisfaction_cond',
            field: 'satisfaction_cond',
            value_valid : 'Regular',
            value_invalid : 'mas o menos'
        },
        {
            describe : 'Route experience_residence',
            field: 'experience_residence',
            value_valid : 'Regular',
            value_invalid : 'Muy Buena'
        }
    ];
    describe('Routes valid pertinence' , function () {

        function makeTest(route) {
            it(route.describe, function (done) {
                chai.request(app)
                    .get('/bot/pertinence/data?messenger user id=101010&'+ route.field + '=' + route.value_valid)
                    .end(function (err, res) {
                        expect(res).to.have.property('body');
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('messages');
                        expect(res.body).to.have.property('redirect_to_blocks');
                        expect(res.body.messages[0]).to.have.property('text', 'La siguiente pregunta es : ');

                        return Survey.findOne({id_student: 101010})
                            .then(function (result) {
                                console.log(result);
                                expect(result.pertinence).to.have.property(route.field, route.value_valid);
                                done();
                            })
                            .catch(function (err) {
                                throw err;
                            });

                    })
            });
        }

        for(let i in routes) {
            makeTest(routes[i]);
        }


    });

    describe('Routes invalid pertinence' , function () {

        function makeTest(route) {
            it(route.describe, function (done) {
                chai.request(app)
                    .get('/bot/pertinence/data?messenger user id=101010&'+ route.field + '=' + route.value_invalid)
                    .end(function (err, res) {
                        expect(res).to.have.property('body');
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors');
                        expect(res.body).to.have.property('name', 'ValidationError');

                        return Survey.findOne({id_student: 101010})
                            .then(function (result) {
                                expect(result.pertinence).to.not.have.property(route.field, route.value_invalid);
                                done();
                            })
                            .catch(function (err) {
                                throw err;
                            });

                    })
            });
        }

        for(let i in routes) {
            makeTest(routes[i]);
        }

    });

    after(function () {
        mongoose.connection.close();
    })

});
