const userService   = require("../../services/user.service");
const surveyService = require("../../services/survey.service");
const templates     = require("../../templates.test");
const blocks        = require("../../utils/blocks.constants");
const nextBlock     = require("../../utils/blocks.order");
const messages      = require("../../utils/messages.bot");

module.exports = {
    registerJobLocation: registerJobLocation,
    initJobLocation:     initJobLocation
};

let user_id = "messenger user id";

function initJobLocation(req, res) {

    let card = new templates.card();

    let response = card
        .addCard('¿Continuamos?')
        .addButton('OK', blocks.BLOCK_ACTUAL_ACTIVITY)
        .get();

    res.send(response);
}

function registerJobLocation(req, res) {
    let keys  = Object.keys(req.query);
    let id    = req.query[user_id];
    let field = keys[1];
    let value = req.query[field];
    // res.send({ id: id, field: field, value: value });

    // Metodo para detectar si es el campo package_comp y por tanto cambiar el body a un arreglo
    if (field === "recruitment_reqs") {
        const answers = {
            1: "Competencias laborales",
            2: "Titulo Profesional",
            3: "Examen de selección",
            4: "Idioma Extranjero",
            5: "Actitudes y habilidades socio-comunicativas (principios y valores)",
            6: "Ninguno",
            7: "Otros"
        };
        let arreglo   = value.match(/\d+/g).map(n => parseInt(n));
        value         = arreglo.map(item => {
            return {description: answers[item]};
        });
    }
    let user = {
        id:         id,
        last_block: nextBlock(field)
    };

    userService
        .updateLastBlock(user)
        .then(data => surveyService.updateJobLocationData(id, field, value))
        .then(() => {

            let generic = new templates.generic();

            let response = generic
                .addText(messages.nextSentence)
                .addRedirect(nextBlock(field))
                .get();

            res.send(response);
        })
        .catch(err => res.send(err));
}
