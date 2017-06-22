/**
 * Created by usuario1 on 6/21/2017.
 */

const userService = require('../services/user.service');
const templates = require('../templates');
const blocks = require('../utils/blocks.constants');

module.exports = {
    registerUser : registerUser
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
                card.addButton(btn1);
                response.add(text);
                response.add(card);
                res.send(response.content);

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
