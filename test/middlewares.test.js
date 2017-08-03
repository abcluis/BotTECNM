/**
 * Created by usuario1 on 7/29/2017.
 */
let expect     = require('chai').expect;
let sinon      = require('sinon');


describe('Middlewares Test', function () {

    describe.skip('Validations.js', function () {

        let mw = require('../app/middlewares/validations');

        it('should return valid with a valid curp', function () {

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
        it('should return a error with a invalid curp', function () {

            let req = {
                query: {
                    'messenger user id': '101010',
                    'curp':              'GAGL950830HCHLNS05'
                }
            };


            let res  = sinon.spy();
            let next = sinon.spy();
            mw(req, res, next);

            let arg = next.getCall(0).args[0];
            expect(next.getCall(0).args).to.be.lengthOf(1);
            expect(arg.message).to.be.equals("Por favor ingresa una curp valida");
            expect(arg).to.be.an('error');
            expect(next.calledOnce).to.be.true;

        });

        it('should continue to next with a valid date', function () {
            let req  = {
                query: {
                    'messenger user id': '101010',
                    'birthdate':         '2010-10-30'
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

        it.skip('should continue to next with error invalid date', function () {
            let req  = {
                query: {
                    'messenger user id': '101010',
                    'birthdate':         '2010-10-32'
                }
            };
            let res  = sinon.spy();
            let next = sinon.spy();

            mw(req, res, next);

            let arg = next.getCall(0).args[0];
            expect(arg.message).to.be.equals("Por favor ingresa la fecha con el formato correcto");
            expect(next.getCall(0).args).to.be.lengthOf(1);
            expect(arg).to.be.an('error');
            expect(next.calledOnce).to.be.true;

        });

        it('should continue to next with error of a invalid state', function () {
            let req  = {
                query: {
                    'messenger user id': '101010',
                    'actual_state' : 'Baja CaliFORNIAsur'
                }
            };

            let res  = sinon.spy();
            let next = sinon.spy();

            mw(req, res, next);
            expect(next.getCall(0).args[0].message).to.be.equals('Por favor debes ingresar un estado valido');
            expect(next.getCall(0).args).to.be.length(1);
            expect(next.getCall(0).args[0]).to.be.an('error');
            expect(next.calledOnce).to.be.true;

        });

        it('should to be true with a state in upper and lower case', function () {
            let req  = {
                query: {
                    'messenger user id': '101010',
                    'actual_state' : 'Baja CaliFORNIA sur'
                }
            };

            let res  = sinon.spy();
            let next = sinon.spy();

            mw(req, res, next);

            expect(next.getCall(0).args).to.be.length(0);
            expect(next.calledOnce).to.be.true;

        });


        it('should throw a error because second field is empty', function () {
            let req  = {
                query: {
                    'messenger user id': '101010'
                }
            };
            let res  = sinon.spy();
            let next = sinon.spy();

            mw(req, res, next);

            let arg = next.getCall(0).args[0];

            expect(next.getCall(0).args).to.be.lengthOf(1);
            expect(arg.message).to.be.equals("Por favor agregue el segundo campo");
            expect(arg).to.be.an('error');
            expect(next.calledOnce).to.be.true;

        });



    });





});