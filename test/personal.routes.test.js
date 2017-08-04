/**
 * Created by usuario1 on 7/29/2017.
 */
let chai       = require('chai')
    , chaiHttp = require('chai-http');
let expect     = require('chai').expect;
chai.use(chaiHttp);
let app            = 'http://localhost:3000';
let Survey         = require('../app/models/survey.model');
let User           = require('../app/models/user.model');
let errorsMessages = require('../app/utils/messages.bot');

let db = require('../config/db');

let nextBlock = require('../app/utils/blocks.order');


describe('Routes Personal Data', function () {

    before(function () {
        db.open();
    });


    beforeEach(function () {
        return Survey.remove({id_student: 101010});
    });

    let routes = [
        {
            describe:      'Route full_name',
            field:         'full_name',
            value_valid:   'Muy buena',
            value_invalid: '321321'
        },
        {
            describe:      'Route curp',
            field:         'curp',
            value_valid:   'GAGL950830HCHLNS06',
            value_invalid: 'GAGL950830HCHLNS05'
        },
        {
            describe:      'Route number_control',
            field:         'number_control',
            value_valid:   "302010",
            value_invalid: 'normal text'
        },
        {
            describe:      'Route birthdate',
            field:         'birthdate',
            value_valid:   '1995-08-30',
            value_invalid: '1995-02-32'
        },
        {
            describe:      'Route true_gender',
            field:         'true_gender',
            value_valid:   'Masculino',
            value_invalid: 'Otro'
        },
        {
            describe:    'Route civil_status',
            field:       'civil_status',
            value_valid: 'Casado'
        },
        {
            describe:    'Route actual_address',
            field:       'actual_address',
            value_valid: 'No disponible'
        },
        {
            describe:    'Route actual_city',
            field:       'actual_city',
            value_valid: 'Chihuahua'
        },
        {
            describe:    'Route actual_municipality',
            field:       'actual_municipality',
            value_valid: 'Chihuahua'
        },
        {
            describe:      'Route actual_state',
            field:         'actual_state',
            value_valid:   'Chihuahua',
            value_invalid: 'chihua hua'
        },
        {
            describe:      'Route phone',
            field:         'phone',
            value_valid:   '321321321321',
            value_invalid: 'no numeros'
        },
        {
            describe:      'Route email',
            field:         'email',
            value_valid:   'abc_luis30@hotmail.com',
            value_invalid: 'abc_luis30'
        },
        {
            describe:      'Route phone_alt',
            field:         'phone_alt',
            value_valid:   '321321321321',
            value_invalid: 'no numeros'
        },
        {
            describe:    'Route career',
            field:       'career',
            value_valid: 'Ingenieria Sistemas'
        },
        {
            describe:    'Route speciality',
            field:       'speciality',
            value_valid: 'Moviles'
        },
        {
            describe:      'Route date_graduate',
            field:         'date_graduate',
            value_valid:   '2018-10',
            value_invalid: '321dsa'
        },
        {
            describe:      'Route certificated',
            field:         'certificated',
            value_valid:   'Si',
            value_invalid: 'No estoy certificado'
        },
        {
            describe:      'Route english_mastery',
            field:         'english_mastery',
            value_valid:   '80',
            value_invalid: 'Buen nivel'
        },
        {
            describe:    'Route other_mastery',
            field:       'other_mastery',
            value_valid: 'Otro'
        },
        {
            describe:    'Route package_comp',
            field:       'package_comp',
            value_valid: 'SQL, JAVA, Android'
        }
    ];

    describe('Valid Personal Data Routes', function () {



        it('Register user', function () {
            return chai.request(app)
                .post('/bot/start')
                .send({
                    'messenger user id': 101010,
                    'first name':        'Luis Fernando',
                    'last name':         'Gallegos Gonzalez'
                })
                .then(function (res) {
                    expect(res.body).to.have.property('messages');
                    expect(res.body.messages).to.be.an('array');
                    expect(res.body.messages[0]).to.have.property('text');
                    expect(res.body.messages[1]).to.have.property('attachment');
                    return User.findOne({id: 101010});
                })
                .then(function (res) {
                    expect(res).to.be.an('object');
                    expect(res).to.have.property('id', 101010);
                })
                .catch(function (err) {
                    throw err;
                })
        });

        it('Register school', function () {
            return chai.request(app)
                .get('/bot/school?messenger user id=101010&school=itch ii')
                .then(function (res) {

                    expect(res).to.have.property('body');
                    expect(res.body).to.have.property('messages');
                    expect(res.body.messages).to.be.an('array');
                    expect(res.body.messages[0]).to.have.property('attachment');
                    return Survey.findOne({id_student: 101010});
                })
                .then(function (res) {
                    expect(res).to.be.an('object');
                    expect(res).to.have.property('school', 'Instituto Tecnologico de Chihuahua II');
                })
                .catch(function (err) {
                    throw err;
                })
        });


        function makeRequest(route) {
            it(route.describe, function () {

                let uri = '/bot/personal/data?messenger user id=101010&' + route.field + '=' + route.value_valid;

                return chai.request(app)
                    .get(uri)
                    .then(function (res) {
                        console.log(res.body);
                        expect(res).to.have.property('body');
                        expect(res.body).to.have.property('messages');
                        expect(res.body).to.have.property('redirect_to_blocks');
                        expect(res.body.redirect_to_blocks[0]).to.equal(nextBlock(route.field));
                        return Survey.findOne({id_student: 101010});
                    })
                    .then(function (res) {
                        expect(res).to.be.an('object');
                        if (route.field === 'package_comp') {
                            expect(res.personal_data).to.have.property(route.field);
                            expect(res.personal_data[route.field]).to.be.an('array');
                            expect(res.personal_data[route.field]).to.lengthOf(3);
                        } else {
                            expect(res.personal_data).to.have.property(route.field, route.value_valid);

                        }
                    })
                    .catch(function (err) {
                        throw err;
                    });
            });
        }

        for (let i in routes) {
            if(routes[i].value_valid){
                makeRequest(routes[i]);
            }
        }


    });

    describe('Invalid Personal Data Routes', function () {

        it('Route fullname with typo', function () {

            let uri = '/bot/personal/data?messenger user id=101010&fullname=Luis Gallegos';

            return chai.request(app)
                .get(uri)
                .then(function (res) {
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('messages');
                    expect(res.body).to.have.property('redirect_to_blocks');
                    expect(res.body.redirect_to_blocks[0]).to.equal('school');
                    expect(res.body.messages[0]).to.have.property('text', errorsMessages.fieldWithTypo);
                    console.log(res.body);
                    return Survey.findOne({id_student : 101010});
                })
                .then(function (survey) {

                    expect(survey).to.be.null;
                })
                .catch(function (err) {
                    throw err;
                })
        });


        function makeRequest(route) {
            it(route.describe, function () {

                let uri = '/bot/personal/data?messenger user id=101010&' + route.field + '=' + route.value_invalid;


                return chai.request(app)
                    .get(uri)
                    .then(function (res) {
                        console.log(res.body);
                        expect(res).to.have.property('body');
                        expect(res.body).to.have.property('messages');
                        expect(res.body).to.have.property('redirect_to_blocks');
                        expect(res.body.messages[0]).to.have.property('text', errorsMessages[route.field]);
                        expect(res.body.redirect_to_blocks[0]).to.equal(route.field);
                        return Survey.findOne({id_student: 101010});
                    })
                    .then(function (res) {
                        expect(res).to.be.an('object');
                        expect(res.personal_data).to.not.have.property(route.field, route.value_valid);
                    })
                    .catch(function (err) {
                        throw err;
                    });
            });
        }


        for (let i in routes) {
            if (routes[i].value_invalid) {
                makeRequest(routes[i]);
            }
        }





    });


    after(function () {
        db.close();
    });

});

