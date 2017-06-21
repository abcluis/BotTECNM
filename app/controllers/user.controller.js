/**
 * Created by usuario1 on 6/21/2017.
 */
const userService = require('../services/user.service');

module.exports = {
    postUser:   postUser,
    getOneUser: getOneUser,
    getUsers:   getUsers
};


function postUser(req, res) {
    userService.createUser(req.body)
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
}

function getOneUser(req, res) {
    userService.findOneUser(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => res.send(err));
}

function getUsers(req, res) {
    userService.findUsers()
        .then((results) => res.send(results))
        .catch((err) => res.send(err));
}