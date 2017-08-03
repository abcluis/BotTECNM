/**
 * Created by usuario1 on 8/2/2017.
 */

const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;


module.exports = {
    open : open,
    close : close
};

function open() {
    let NODE_ENV = process.env.NODE_ENV || 'test';
    let config    = require(`./${NODE_ENV}`);
    let MONGO_URI = config.MONGO_URI;

    mongoose.connect(MONGO_URI, function (err) {
        if (err)
            throw err;
        console.log('Connected to BotTECNM db in mode : ' + process.env.NODE_ENV);
    });
}

function close() {
    mongoose.connection.close();
}