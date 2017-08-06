/**
 * Created by usuario1 on 7/29/2017.
 */
let expect = require('chai').expect;
let sinon  = require('sinon');

let messages = require('../app/utils/messages.bot');


describe('Middlewares Test', function () {

    describe('Validations.js', function () {

        let mw = require('../app/middlewares/validations');

        it('should return that is invalid field', function () {

            let req = {
                query: {
                    'messenger user id': '101010',
                    'fullname':          'Luis gallegos'
                }
            };

            let res  = {};
            res.send = function (body) {

                let responseExpected = {
                    messages : [
                        {
                            text : messages.fieldWithTypo
                        }
                    ],
                    redirect_to_blocks : ['school']
                };

                expect(body).to.deep.equal(responseExpected);

            };
            let next = sinon.spy();
            mw(req, res, next);

        });

        it('should pass to next middleware with a valid field', function () {

            let req = {
                query: {
                    'messenger user id': '101010',
                    'curp':              'GAGL950830HCHLNS06'
                }
            };

            let res  = sinon.spy();
            let next = sinon.spy();
            mw(req, res, next);

            let arg = next.getCall(0).args[0];
            expect(next.getCall(0).args).to.be.lengthOf(0);
            expect(arg).to.be.an('undefined');
            expect(next.calledOnce).to.be.true;

        });


    });


});