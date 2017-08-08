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
                    "text": "This is a text"
                },
                {
                    "text" : "This is a quick replies",
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
            .addText('This is a text')
            .addText('This is a quick replies')
            .addQuick('title_1','url_1')
            .get();


        expect(response).to.deep.equal(expected);


    });

    it('should return a quick replies with two elements', function () {

        let expected = {
            "messages" : [
                {
                    "text" : "This is a quick replies",
                    "quick_replies" : [
                        {
                            "title": 'title_1',
                            "url":   "url_1",
                            "type":  "json_plugin_url"
                        },
                        {
                            "title": 'title_2',
                            "url":   "url_2",
                            "type":  "json_plugin_url"
                        }
                    ]
                }
            ]
        };

        let quick = new templates.quick();

        let response = quick
            .addText('This is a quick replies')
            .addQuick('title_1', 'url_1')
            .addQuick('title_2', 'url_2')
            .get();

        expect(response).to.deep.equal(expected);

    });

    it('Should return a list with two options', function () {

        let expected = {
            "messages": [
                {
                    "attachment":{
                        "type":"template",
                        "payload":{
                            "template_type":"list",
                            "top_element_style":"large",
                            "elements":[
                                {
                                    "title":"Element 1",
                                    "image_url":"http://rockets.chatfuel.com/img/shirt.png",
                                    "buttons":[
                                        {
                                            "type":"json_plugin_url",
                                            "url":"url 1",
                                            "title":"Elegir"
                                        }
                                    ]
                                },
                                {
                                    "title":"Element 2",
                                    "image_url":"http://rockets.chatfuel.com/img/hoodie.png",
                                    "buttons":[
                                        {
                                            "type":"json_plugin_url",
                                            "url":"url 2",
                                            "title":"Elegir"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            ]
        };

        let list = new templates.list();

        let response = list
            .addList()
            .addElement('Element 1', 'url 1','http://rockets.chatfuel.com/img/shirt.png')
            .addElement('Element 2', 'url 2', 'http://rockets.chatfuel.com/img/hoodie.png')
            .get();

        expect(response).to.deep.equal(expected);



    });

    it('Should return a text with a list', function () {

        let expected = {
            "messages": [
                {
                  "text" : "This is a text",
                },
                {
                    "attachment":{
                        "type":"template",
                        "payload":{
                            "template_type":"list",
                            "top_element_style":"large",
                            "elements":[
                                {
                                    "title":"Element 1",
                                    "image_url":"http://rockets.chatfuel.com/img/shirt.png",
                                    "buttons":[
                                        {
                                            "type":"json_plugin_url",
                                            "url":"url 1",
                                            "title":"Elegir"
                                        }
                                    ]
                                },
                                {
                                    "title":"Element 2",
                                    "image_url":"http://rockets.chatfuel.com/img/hoodie.png",
                                    "buttons":[
                                        {
                                            "type":"json_plugin_url",
                                            "url":"url 2",
                                            "title":"Elegir"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            ]
        };


    });

});
