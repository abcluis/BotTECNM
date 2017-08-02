/**
 * Created by usuario1 on 7/28/2017.
 */

const UserService = require('../services/user.service');
const nextBlock   = require('../utils/blocks.order');


function record(req, res, next) {

    console.log(req.path);

    if(req.path === '/bot/start' || req.path === '/bot/pertinence/init'){
        next();
    }else {
        let id = req.query['messenger user id'];

        let keys = Object.keys(req.query);
        let field = keys[1];

        let user = {
            id:         id,
            last_block: nextBlock(field)
        };

        UserService.updateLastBlock(user)
            .then((user) => {
                next();
            }).catch((err) => {
                console.log(err);
            }
        );

    }



}

module.exports = record;