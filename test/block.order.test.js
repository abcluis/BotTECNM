/**
 * Created by usuario1 on 8/8/2017.
 */
let chai   = require('chai');
let expect = chai.expect;

let nextBlock = require('../app/utils/blocks.order');
let blocks    = require('../app/utils/blocks.constants');

describe('Order block', function () {

    it('Should return next block', function () {

        let response = nextBlock(blocks.BLOCK_SCHOOL);

        expect(response).to.deep.equal(blocks.BLOCK_CAREER);

    });


    it('Should return time getjob if actual activity is equal Trabaja' , function () {

        let response = nextBlock(blocks.BLOCK_ACTUAL_ACTIVITY, {
            actual_activity : 'Trabaja'
        });

        let expected = blocks.BLOCK_TIME_GETJOB;

        expect(response).to.deep.equal(expected);

    });

    it('Should return activity studies if actual activity is equal Estudia', function () {

        let response = nextBlock(blocks.BLOCK_ACTUAL_ACTIVITY, {
            actual_activity : 'Estudia'
        });

        let expected = blocks.BLOCK_ACTIVITY_STUDIES;

        expect(response).to.deep.equal(expected);

    });

    it('Should return activity studies if actual activity is equal Estudia y trabaja', function () {
        let response = nextBlock(blocks.BLOCK_ACTUAL_ACTIVITY, {
            actual_activity : 'Estudia y trabaja'
        });

        let expected = blocks.BLOCK_ACTIVITY_STUDIES;

        expect(response).to.deep.equal(expected);
    });

    it('Should return IV Intro if actual activity is equal to No estudia o trabaja', function () {
        let response = nextBlock(blocks.BLOCK_ACTUAL_ACTIVITY, {
            actual_activity : 'No estudia o trabaja'
        });

        let expected = blocks.BLOCK_INTRO_IV;

        expect(response).to.deep.equal(expected);
    });

    it('Should return IV Intro if actual activity was only Estudia after to answer speciality inst', function () {
        let response = nextBlock(blocks.BLOCK_SPECIALITY_INST, {
            actual_activity : 'Estudia'
        });

        let expected = blocks.BLOCK_INTRO_IV;

        expect(response).to.deep.equal(expected);
    });

    it('Should return time get job if actual activity was Estudia y trabaja after to answer speciality inst', function () {

        let response = nextBlock(blocks.BLOCK_SPECIALITY_INST, {
            actual_activity : 'Estudia y trabaja'
        });

        let expected = blocks.BLOCK_TIME_GETJOB;

        expect(response).to.deep.equal(expected);

    });

    it('Should return primary sector if economic sector is Sector primario', function () {
        let response = nextBlock(blocks.BLOCK_ECONOMIC_SECTOR, {
            economic_sector : 'Sector primario'
        });

        let expected = blocks.BLOCK_PRIMARY_SECTOR;

        expect(response).to.deep.equal(expected);
    });

    it('Should return secondary sector if economic sector is Sector secundario', function () {
        let response = nextBlock(blocks.BLOCK_ECONOMIC_SECTOR, {
            economic_sector : 'Sector secundario'
        });

        let expected = blocks.BLOCK_SECONDARY_SECTOR;

        expect(response).to.deep.equal(expected);
    });

    it('Should return terciario sector if economic sector is Sector terciario', function () {
        let response = nextBlock(blocks.BLOCK_ECONOMIC_SECTOR, {
            economic_sector : 'Sector terciario'
        });

        let expected = blocks.BLOCK_TERTIARY_SECTOR;

        expect(response).to.deep.equal(expected);
    });

    it('Should return com orgsize after primary sector', function () {
        let response = nextBlock(blocks.BLOCK_PRIMARY_SECTOR);

        let expected = blocks.BLOCK_COMP_ORGSIZE;

        expect(response).to.deep.equal(expected);
    });

    it('Should return com orgsize after secondary sector', function () {
        let response = nextBlock(blocks.BLOCK_SECONDARY_SECTOR);

        let expected = blocks.BLOCK_COMP_ORGSIZE;

        expect(response).to.deep.equal(expected);
    });

    it('Should return com orgsize after tertiary sector', function () {
        let response = nextBlock(blocks.BLOCK_TERTIARY_SECTOR);

        let expected = blocks.BLOCK_COMP_ORGSIZE;

        expect(response).to.deep.equal(expected);
    });



});

