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
let School    = require('../app/models/school.model');
let messages  = require('../app/utils/messages.bot');
let nextBlock = require('../app/utils/blocks.order');
let blocks    = require('../app/utils/blocks.constants');

const templates = require('../app/templates');

let BodyCF   = templates.bodyChat;
let TextCF   = templates.textChat;
let CardCF   = templates.cardChat;
let ButtonCF = templates.buttonBlockChat;
let QuickCF  = templates.quickChat;

let User = require('../app/models/user.model');

describe('Route School', function () {

    before(function () {
        db.open();
    });

    beforeEach(function () {
        return Survey.remove({id_student: 101010})
    });


    it('Should return the options to select the school with a state valid', function () {

        let response;

        return chai.request(app)
            .get('/bot/school?messenger user id=101010&actual_state=chihuahua')
            .then(function (res) {
                response = res;

                expect(res).to.have.property('body');
                return School.find({state: 'chihuahua'});
            })
            .then(function (schools) {
                let body = new BodyCF();
                let text = new TextCF('Selecciona tu instituto');
                body.add(text);
                expect(response.body.messages[0].quick_replies).to.have.lengthOf(schools.length);

                for (let i in schools) {
                    let title = schools[i].nick;
                    let uri   = "https://peaceful-mesa-57140.herokuapp.com/bot/school/response?" + encodeURIComponent('messenger user id=101010') + '&school=' + encodeURIComponent(schools[i].name);
                    let quick = new QuickCF(title, uri);
                    body.addQuick(quick);
                }
                expect(response.body).to.deep.equal(body.content);

            })
            .catch(function (err) {
                throw err;
            });


    });

    it('Should return message without options a state invalid', function () {

        let response;

        return chai.request(app)
            .get('/bot/school?messenger user id=101010&actual_state=chihuas')
            .then(function (res) {
                response = res;
                expect(res).to.have.property('body');
                expect(res.body).to.have.property('messages');
                expect(res.body.messages[0]).to.have.property('text', messages.schoolsNotFound);
                expect(res.body.messages[0]).to.not.have.property('quick_replies');
                expect(res.body.redirect_to_blocks[0]).to.equal(blocks.BLOCK_SCHOOL);
            })
            .catch(function (err) {
                throw err;
            });


    });

    it('Should confirm school user input', function () {


        return chai.request(app)
            .get('/bot/school/response?messenger user id=101010&school=Instituto Tecnologico de Chihuahua II')
            .then(function (res) {
                let body   = new templates.bodyChat();
                let card   = new templates.cardChat('Asi que eres del Instituto Tecnologico de Chihuahua II');
                let btnYes = new templates.buttonBlockChat('Yes', blocks.BLOCK_CAREER);
                let btnNo  = new templates.buttonBlockChat('No', blocks.BLOCK_SCHOOL);
                card.addButton(btnYes);
                card.addButton(btnNo);
                body.add(card);
                expect(res.body).to.deep.equal(body.content);
                return Survey.findOne({id_student: 101010});
            })
            .then(function (survey) {
                let school = 'Instituto Tecnologico de Chihuahua II';
                expect(survey).to.have.property('school', school);
                return User.findOne({id: 101010});
            })
            .then(function (user) {
                expect(user).to.have.property('last_block', nextBlock(blocks.BLOCK_SCHOOL));
            })
            .catch(function (err) {
                throw err;
            });


    });

    it('Should return a list of all careers of university selected', function () {

        let school = 'Instituto Tecnologico de Chihuahua II';

        let responseExpected = {
            "messages": [
                {
                    "attachment": {
                        "type":    "template",
                        "payload": {
                            "template_type":     "list",
                            "top_element_style": "large",
                            "elements":          []
                        }
                    }
                }
            ]
        };


        let survey = {
            id_student: 101010,
            school:     school
        };


        let testCareer;

        return new Survey(survey).save()
            .then(function (res) {
                expect(res).to.have.property('school', school);
                return School.findOne({name: school}).exec();

            })
            .then(function (school_doc) {

                school_doc.careers.forEach(function (item, index) {
                    responseExpected.messages[0].attachment.payload.elements.push({
                        "title":     item.name,
                        "image_url": "http://www.itmatamoros.edu.mx/wp-content/uploads/2017/05/Logo-TecNM-2017-Ganador.png",
                        "buttons":   [
                            {
                                "type":  "json_plugin_url",
                                "url":   "https://peaceful-mesa-57140.herokuapp.com/bot/personal/data?"
                                         + encodeURIComponent('messenger user id') + '=' + 101010 + '&career=' + encodeURIComponent(item.name),
                                "title": "Elegir"
                            }
                        ]
                    });
                });
                return chai.request(app)
                    .get('/bot/career?messenger user id=101010&school=' + school);
            })
            .then(function (res) {
                expect(res).to.have.property('body');
                expect(res.body).to.deep.equal(responseExpected);
                testCareer = responseExpected.messages[0].attachment.payload.elements[0].title;
                return chai.request(app)
                    .get('/bot/personal/data?messenger user id=101010&career=' + testCareer);
            })
            .then(function (res) {
                expect(res).to.have.property('body');

                let body = new BodyCF();
                let text = new TextCF(messages.nextSentence);


                body.add(text);
                body.content.redirect_to_blocks = [nextBlock(blocks.BLOCK_CAREER)];

                expect(res.body).to.deep.equal(body.content);
                return Survey.findOne({id_student: 101010});
            })
            .then(function (doc) {
                expect(doc).to.have.property('personal_data');
                expect(doc.personal_data).to.have.property('career', testCareer);
            })
            .catch(function (err) {
                throw err;
            });


    });


    after(function () {
        db.close();
    });

});

