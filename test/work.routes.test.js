/**
 * Created by usuario1 on 8/2/2017.
 */
let chai     = require('chai');
let chaiHttp = require('chai-http');
let expect   = require('chai').expect;
let mongoose = require('mongoose');

chai.use(chaiHttp);

let app    = 'http://localhost:3000';
let Survey = require('../app/models/survey.model');
let nextBlock = require('../app/utils/blocks.order');


mongoose.Promise = global.Promise;


describe('Routes Work Aspect', function () {

    before(function () {
        mongoose.connect('mongodb://admin:admin@ds133582.mlab.com:33582/bottecnm', function (err) {
            if (err)
                throw err;
            console.log('Connected to BotTECNM db');
        });
    });

    beforeEach(function () {
        return Survey.remove({id_student : 101010});
    });

    let routes = [
        {
            describe:      'Route actual_activity',
            field:         'actual_activity',
            value_valid:   'Muy buena',
            value_invalid: 'buenos'
        },
        {
            describe:      'Route activity_studies',
            field:         'activity_studies',
            value_valid:   'Muy bueno',
            value_invalid: '80'
        },
        {
            describe:      'Route speciality_inst',
            field:         'speciality_inst',
            value_valid:   'Buena',
            value_invalid: 20
        },
        {
            describe:      'Route time_getjob',
            field:         'time_getjob',
            value_valid:   'Mala',
            value_invalid: 40 + ' hola'
        },
        {
            describe:      'Route how_gotjob',
            field:         'how_gotjob',
            value_valid:   'Regular',
            value_invalid: 'mas o menos'
        },
        {
            describe:      'Route recruitment_reqs',
            field:         'recruitment_reqs',
            value_valid:   '1 2 3',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route language_job',
            field:         'language_job',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route perc_speak',
            field:         'perc_speak',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route perc_write',
            field:         'perc_write',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route perc_read',
            field:         'perc_read',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route perc_listen',
            field:         'perc_listen',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route years_antiguaty',
            field:         'years_antiguaty',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route year_income',
            field:         'year_income',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route minimum_salary',
            field:         'minimum_salary',
            value_valid:   10000,
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route hierarchical_level',
            field:         'hierarchical_level',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route work_condition',
            field:         'work_condition',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route work_studyrel',
            field:         'work_studyrel',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route organism',
            field:         'organism',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route business_act',
            field:         'business_act',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route social_reason',
            field:         'social_reason',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route address_iii',
            field:         'address_iii',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route city_iii',
            field:         'city_iii',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route municipality_iii',
            field:         'municipality_iii',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route state_iii',
            field:         'state_iii',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route tel_ext_iii',
            field:         'tel_ext_iii',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route fax_iii',
            field:         'fax_iii',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route email_iii',
            field:         'email_iii',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route webpage_iii',
            field:         'webpage_iii',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route boss_namejob',
            field:         'boss_namejob',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route economic_sector',
            field:         'economic_sector',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        },
        {
            describe:      'Route comp_orgsize',
            field:         'comp_orgsize',
            value_valid:   'Regular',
            value_invalid: 'Muy Buena'
        }
    ];


    describe('Routes valid work aspect', function () {

        function makeRequest(route) {
            it(route.describe, function () {
                return chai.request(app)
                    .get('/bot/joblocation/data?messenger user id=101010&' + route.field + '=' + route.value_valid)
                    .then(function (res) {
                        expect(res).to.have.property('body');
                        expect(res.body).to.have.property('messages');
                        expect(res.body).to.have.property('redirect_to_blocks');
                        expect(res.body.redirect_to_blocks).to.be.an('array');
                        expect(res.body.redirect_to_blocks[0]).to.equal(nextBlock(route.field));

                        return Survey.findOne({id_student : 101010});
                    })
                    .then(function (survey) {
                        console.log(survey);
                        expect(survey).to.have.property('work_aspect');
                        if(route.field === 'recruitment_reqs') {
                            expect(survey.work_aspect.recruitment_reqs).to.be.an('array');
                        }else {
                            expect(survey.work_aspect).to.have.property(route.field, route.value_valid);
                        }
                        //expect(survey.work_aspect).to.have.property(route.field, 'Holi');

                    })
                    .catch(function (err) {
                        throw err;
                    });
            })
        }

        for (let i in routes) {
            makeRequest(routes[i]);
        }

    });
    
    describe('Routes invalid work aspect', function () {
       
        
        function makeRequest(route) {
            
            it(route.describe, function () {
                return chai.request(app)
                    .get('/bot/joblocation/data?messenger user id=101010&' + route.field + '=' + route.value_valid)
                    .then(function (res) {

                    })
            })
            
        }
        
        /*for(let i in routes) {
            makeRequest(routes[i]);
        }*/
        
        
    });


    after(function () {
        mongoose.connection.close();
    });

});