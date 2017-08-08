let chai     = require('chai');
let chaiHttp = require('chai-http');
let expect   = chai.expect;

chai.use(chaiHttp);

let app       = 'http://localhost:3000';
let db        = require('../config/db');
let Survey    = require('../app/models/survey.model');
let User      = require('../app/models/user.model');
let messages  = require('../app/utils/messages.bot');
let nextBlock = require('../app/utils/blocks.order');

let templates = require('../app/templates.test');

describe('Routes Performance', function () {

    before(function () {
        db.open();
    });

    beforeEach(function () {
        return Survey.remove({id_student: 101010});
    });

    let routes = [
        {
            describe:      'Route academic_efficiency',
            field:         'academic_efficiency',
            value_valid:   'Eficiente',
            value_invalid: 'Poco'
        },
        {
            describe:      'Route academic_calification',
            field:         'academic_calification',
            value_valid:   'Excelente',
            value_invalid: 'Muy bueno'
        },
        {
            describe:      'Route residences_utility',
            field:         'residences_utility',
            value_valid:   "Bueno",
            value_invalid: 'Mala'
        },
        {
            describe:      'Route field_of_study',
            field:         'field_of_study',
            value_valid:   '1',
            value_invalid: '6'
        },
        {
            describe:      'Route academic_degree',
            field:         'academic_degree',
            value_valid:   '3',
            value_invalid: '6'
        },
        {
            describe:      'Route work_experience',
            field:         'work_experience',
            value_valid:   '2',
            value_invalid: 'Bueno'
        },
        {
            describe:      'Route labor_competence',
            field:         'labor_competence',
            value_valid:   '1',
            value_invalid: 'Bueno'
        },
        {
            describe:      'Route institute_position',
            field:         'institute_position',
            value_valid:   '2',
            value_invalid: '6'
        },
        {
            describe:      'Route knowledge_flanguages',
            field:         'knowledge_flanguages',
            value_valid:   '3',
            value_invalid: 'Bueno bueno'
        },
        {
            describe:      'Route references',
            field:         'references',
            value_valid:   '2',
            value_invalid: '0'
        },
        {
            describe:      'Route personality',
            field:         'personality',
            value_valid:   '4',
            value_invalid: '10'
        },
        {
            describe:      'Route leadership',
            field:         'leadership',
            value_valid:   '2',
            value_invalid: 'correo'
        },
        {
            describe:      'Route others_performance',
            field:         'others_performance',
            value_valid:   '3',
            value_invalid: 'No'
        }
    ];

    describe('Valid routes performance', function () {

        function makeTest(route) {
            it(route.describe, function () {

                return chai.request(app)
                    .get('/bot/performance/data?messenger user id=101010&' + route.field + '=' + route.value_valid)
                    .then(function (res) {

                        let generic = new templates.generic();

                        let expected = generic
                            .addText(messages.nextSentence)
                            .addRedirect(nextBlock(route.field))
                            .get();


                        expect(res.body).to.deep.equal(expected);
                        return Survey.findOne({id_student: 101010});
                    })
                    .then(function (survey) {
                        expect(survey).to.be.an('object');
                        expect(survey.performance).to.have.property(route.field, route.value_valid);
                        return User.findOne({id : 101010});
                    })
                    .then(function (doc) {
                        expect(doc).to.have.property('last_block',nextBlock(route.field));
                    })
                    .catch(function (err) {
                        throw err;
                    });


            });
        }

        for (let i in routes) {
            makeTest(routes[i]);
        }


    });

    describe('Invalid routes performance', function () {

        function makeTest(route) {
            it(route.describe, function () {

                let uri = '/bot/performance/data?messenger user id=101010&' + route.field + '=' + route.value_invalid;

                return chai.request(app)
                    .get(uri)
                    .then(function (res) {
                        expect(res).to.have.property('body');
                        expect(res.body).to.have.property('messages');
                        expect(res.body.messages[0]).to.have.property('text', messages[route.field]);
                        expect(res.body).to.have.property('redirect_to_blocks');
                        expect(res.body.redirect_to_blocks[0]).to.equal(route.field);
                        return Survey.findOne({id_student: 101010});
                    })
                    .then(function (survey) {
                        expect(survey).to.not.have.property('performance', route.field);
                    })
                    .catch(function (err) {
                        throw err;
                    })
            });
        }

        for (let i in routes) {
            makeTest(routes[i]);
        }
    });


    after(function () {
        db.close();
    });

});