const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const db         = require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(require('./app/routes'));


let port = process.env.PORT || 3000;
// Para cambiarlo a produccion SET NODE_ENV=production
console.log(process.env.NODE_ENV);
console.log('cambiado ...');

db.open();

require('./app/job/remember');

let url = 'https://api.chatfuel.com/bots/5941e907e4b07123678c4199/users/1453872458011175/send?chatfuel_token=vnbqX6cpvXUXFcOKr5RHJ7psSpHDRzO1hXBY8dkvn50ZkZyWML3YdtoCnKH7FSjC&chatfuel_block_name=full_name&attrprueba=20';


app.listen(port, function (err) {
    if (err) throw err;
    console.log(`Chatfuel Bot-Server listening on port ${port}...`);
});