let templates = require('../app/templates.test');


let chai   = require('chai');
let expect = chai.expect;

let messages  = require('../app/utils/messages.bot');
let nextBlock = require('../app/utils/blocks.order');
let blocks    = require('../app/utils/blocks.constants');

describe('Templates JS', function () {


    it('Should return a card with two buttons', function () {

        let expected = {
            "messages": [
                {
                    "attachment": {
                        "type":    "template",
                        "payload": {
                            "template_type": "button",
                            "text":          'Esto es una carta',
                            "buttons":       [
                                {
                                    "type":       "show_block",
                                    "block_name": 'block_1',
                                    "title":      'Button 1'
                                },
                                {
                                    "type":       "show_block",
                                    "block_name": 'block_2',
                                    "title":      'Button 2'
                                }
                            ]
                        }
                    }
                }
            ]
        };

        let card = new templates.card();

        let response = card
            .addCard('Esto es una carta')
            .addButton('Button 1', 'block_1')
            .addButton('Button 2', 'block_2')
            .get();

        expect(response).to.deep.equal(expected);

    });

    it('Should return a card with three buttons and one text', function () {

        let expected = {
            "messages": [
                {
                    "attachment": {
                        "type":    "template",
                        "payload": {
                            "template_type": "button",
                            "text":          'Esto es una carta',
                            "buttons":       [
                                {
                                    "type":       "show_block",
                                    "block_name": 'block_1',
                                    "title":      'Button 1'
                                },
                                {
                                    "type":       "show_block",
                                    "block_name": 'block_2',
                                    "title":      'Button 2'
                                },
                                {
                                    "type":       "show_block",
                                    "block_name": 'block_3',
                                    "title":      'Button 3'
                                }
                            ]
                        }
                    }
                },
                {
                    "text": "Text of test"
                }
            ]
        };

        let card = new templates.card();

        let response = card
            .addCard('Esto es una carta')
            .addButton('Button 1', 'block_1')
            .addButton('Button 2', 'block_2')
            .addButton('Button 3', 'block_3')
            .addText('Text of test')
            .get();

        expect(response).to.deep.equal(expected);

    });

    it('should return a redirect with a text', function () {


        let expected = {
            "messages" : [
                {
                    "text" : 'This is a text'
                }
            ],
            "redirect_to_blocks": ['block_1']
        };

        let generic = new templates.generic();

        let response = generic
            .addText('This is a text')
            .addRedirect('block_1')
            .get();

        expect(response).to.deep.equal(expected);

    });

    it('should return a quick replies with a element and with a text', function () {

        let expected = {
            "messages" : [
                {
                    "text": "this is a text"
                },
                {
                    "quick_replies" : [
                        {
                            "title": 'title_1',
                            "url":   "url_1",
                            "type":  "json_plugin_url"
                        }
                    ]
                }
            ]
        };

        let quick = new templates.quick();

        let response = quick
            .addText('this is a text')
            .addQuick('title_1','url_1')
            .get();

        console.log(response);

        expect(response).to.deep.equal(expected);


    });

    it('should return a quick replies with two elements')

});
