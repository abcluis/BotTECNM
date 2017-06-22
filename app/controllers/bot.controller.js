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

    let user = {
        name : req.body[firstName] + ' ' + req.body[lastName],
        id : req.body[user_id]
    };




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
                        let btn2 = templates.createButtonBlock(blocks.BLOCK_DATEGRAD,'Desde donde me quedé');

                        card.attachment.payload.buttons.push(btn1, btn2);
                        response.messages.push(text);
                        response.messages.push(card);

                        res.send(response);
                    })
            }else {
                res.send(err);
            }

        });
}
