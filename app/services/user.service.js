/**
 * Created by usuario1 on 6/21/2017.
 */
const User = require('../models/user.model');

module.exports = {
    findUsers:       findUsers,
    findOneUser:     findOneUser,
    createUser:      createUser,
    findOneOrCreate: findOneOrCreate,
    updateLastBlock: updateLastBlock
};

function findUsers() {
    return User.find({});
}

function findOneUser(id) {
    return User.findOne({id: id});
}

function findOneOrCreate(user) {


    return User.findOne({id: user.id})
        .then((data) => {
            if (data) {
                return data;
            } else {
                return User.create(user);
            }
        })

}

function updateLastBlock(user) {
    return User.findOne({id: user.id})
        .then((data) => {
            if(data){
                data.last_block = user.last_block;
                return data.save();
            }else {
                throw new Error('User not register yet');
            }
        })
        .catch((err) => {
            return err;
        })
}

function createUser(user) {
    return new User(user).save();
}



