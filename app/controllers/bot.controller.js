/**
 * Created by usuario1 on 6/21/2017.
 */

const userService = require('../services/user.service');
const templates = require('../templates');
const blocks = require('../utils/blocks.constants');

module.exports = {
    registerUser : registerUser,
    registerSchool: registerSchool
};

function registerUser(req,res) {
    let user_id = 'messenger user id';
    let firstName = 'first name';
    let lastName = 'last name';

    let userBody = {
        name : req.body[firstName] + ' ' + req.body[lastName],
        id : req.body[user_id]
    };
    userService.findOneUser(req.body[user_id])
        .then((user) => {
            if(user){
                
                let response = new templates.bodyChat();
                let text = new templates.textChat('Hola bienvenido de nuevo ' + user.name);  
                let card = new templates.cardChat('Vamos a continuar con la encuesta');
                let btn1 = new templates.buttonBlockChat('OK',blocks.BLOCK_SCHOOL);
                let btn2 = new templates.buttonBlockChat('Desde fecha egreso', blocks.BLOCK_DATEGRAD);
                card.addButton(btn1);
                card.addButton(btn2);
                response.add(text);
                response.add(card);
                res.send(response.content);


/*

    userService.createUser(user)
        .then((userCreated)=> {
            res.send({
                "messages": [
                    {"text": "Hola " + userCreated.name + " gracias por participar en esta encuesta"},
                    {
                        "attachment": {
                            "type":    "template",
                            "payload": {
                                "template_type": "button",
                                "text":          "Comenzemos la encuesta",
                                "buttons":       [
                                    {
                                        "type":       "show_block",
                                        "block_name": "USER Input",
                                        "title":      "Ok"
                                    }
                                ]
                            }
                        }
                    }
                ]
            })
        })
        .catch((err) => {
            if(err.code === 11000){
                userService.findOneUser(req.body[user_id])
                    .then((user) => {

                        let response = templates.createBody();
                        let text = templates.createText("Hola de nuevo " + user.name + " reanudemos la encuesta");
                        let card = templates.createCard('Hola esto es una carta de prueba');

                        let btn1 = templates.createButtonBlock(blocks.BLOCK_SCHOOL,'Desde el inicio');
                        let btn2 = templates.createButtonBlock(blocks.BLOCK_DATEGRAD,'Desde fecha de graduacion');

                        card.attachment.payload.buttons.push(btn1, btn2);
                        response.messages.push(text);
                        response.messages.push(card);

                        res.send(response);
                    })
*/
            }else {
                return userService.createUser(userBody);
            }
        })
        .then((user) => {
            if(user){
                let response = new templates.bodyChat();
                let text = new templates.textChat('Hola bienvenido ' + user.name);  
                let card = new templates.cardChat('Esto es una encuesta de los egresados gracias por tu participacion, empezemos');
                let btn1 = new templates.buttonBlockChat('OK',blocks.BLOCK_SCHOOL);
                card.addButton(btn1);
                response.add(text);
                response.add(card);
                
                res.send(response.content);
            }else {

            }
            
        })
        .catch((err) => res.send(err));
}

function registerSchool(req,res){


    School.findOne({'nicks.name': req.body.school})
        .then((result) => {
            if (result) {

                let body = templates.bodyChat();
                let card = templates.cardChat('Asi que eres del ' + result.name);
                let btnYes = templates.buttonBlockChat('Yes', blocks.BLOCK_DATEGRAD);
                let btnNo = templates.buttonBlockChat('No', blocks.BLOCK_SCHOOL);

                card.addButton(btnYes);
                card.addButton(btnNo);
                body.add(card);

                res.send(body.content);
                
            }else {
                let body = templates.bodyChat();
                let card = templates.cardChat('Puedes volver a ingresar la informacion');
                let btnOk = templates.buttonBlockChat('OK', blocks.BLOCK_SCHOOL);

                card.addButton(btnOk);
                body.add(card);
                res.send(body.content);
            }

        })
        .catch((err) => res.send(err));
}
