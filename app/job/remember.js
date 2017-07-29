/**
 * Created by usuario1 on 7/28/2017.
 */
let schedule = require('node-schedule');
let User = require('../models/user.model');
const rp = require('request-promise');

let rule = new schedule.RecurrenceRule();
rule.second = [0, 20, 40];

//let job = schedule.scheduleJob('0 * * * * *', function(){
let job = schedule.scheduleJob('10 * * * *', function () {
    User.find({}).exec()
        .then((users) => {
            users.forEach(function (user, index) {
                if(user.id > 100) {
                    let time = new Date() - user.updated_at;
                    console.log(user.name);
                    console.log(time);
                    if(time > 1000 * 60 * 2){
                        // 2 Minutos que no se ha actualizado
                        console.log('Necesita actualizarse ' + user.name);
                        // Ahora enviamos una notificacion al usuario para que conteste el prro :v

                        if(user.last_block !== 'finish') {

                            let id = user.id;
                            let block = user.last_block;
                            let uri = 'https://api.chatfuel.com/bots/5941e907e4b07123678c4199/users/' + id +'/send?chatfuel_token=vnbqX6cpvXUXFcOKr5RHJ7psSpHDRzO1hXBY8dkvn50ZkZyWML3YdtoCnKH7FSjC&chatfuel_block_name=' + block + '&attrprueba=20';
                            uri = uri.replace(' ', '%20');
                            let options = {
                                method: 'POST',
                                uri: uri,
                                json: true // Automatically stringifies the body to JSON
                            };

                            return rp(options)
                                .then(() => {
                                    console.log('Enviado a ' + user.name);
                                    user.updated_at = new Date();
                                    return user.save();
                                })
                                .then((result) => {
                                    console.log(result);
                                })
                                .catch((err) => {
                                    console.error(err.message)
                                });
                        }

                    }
                }else {

                }
            })
        })
        .catch((err) => {
            console.error(err);
        });


    console.log('The answer to life, the universe, and everything!');

});