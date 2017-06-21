/**
 * Created by usuario1 on 6/21/2017.
 */

const userService = require('../services/user.service');

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
                        res.send({
                            "messages": [
                                {"text": "Hola de nuevo " + user.name + " reanudemos la encuesta"},
                                {
                                    "attachment": {
                                        "type":    "template",
                                        "payload": {
                                            "template_type": "button",
                                            "text":          "Reanudar la encuesta",
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
            }else {
                res.send(err);
            }

        });
}
