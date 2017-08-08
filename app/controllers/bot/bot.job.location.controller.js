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

    // Metodo para detectar si es el campo package_comp y por tanto cambiar el body a un arreglo
    if (field === "recruitment_reqs") {
        value = getArray(value);
    }
    let user = {
        id:         id,
        last_block: nextBlock(field)
    };

    userService
        .updateLastBlock(user)
        .then(data => surveyService.updateJobLocationData(id, field, value))
        .then((survey) => {

            let response = createResponse(field,value, survey);

            res.send(response);
        })
        .catch(err => res.send(err));
}

function createResponse(field,value, survey) {
    let generic = new templates.generic();

    let options = {};

    switch (field){

        case blocks.BLOCK_ACTUAL_ACTIVITY:

            options[field] = value;
            break;
        case blocks.BLOCK_SPECIALITY_INST:
            options['actual_activity'] = survey.work_aspect.actual_activity;
            break;
        case blocks.BLOCK_ECONOMIC_SECTOR:

            options[blocks.BLOCK_ECONOMIC_SECTOR] = value;
            break;
    }

    return generic
        .addText(messages.nextSentence)
        .addRedirect(nextBlock(field, options))
        .get();

}

function getArray(value) {
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
    return arreglo.map(item => {
        return {description: answers[item]};
    });
}

