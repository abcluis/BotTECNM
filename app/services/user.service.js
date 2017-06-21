/**
 * Created by usuario1 on 6/21/2017.
 */
const User = require('../models/user.model');

module.exports = {
    findUsers: findUsers,
    findOneUser: findOneUser,
    createUser: createUser
};

function findUsers() {
    return User.find({});
}

function findOneUser(id) {
    return User.findOne({id: id});
}

function createUser(user) {
    return new User(user).save();
}



