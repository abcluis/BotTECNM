/**
 * Created by usuario1 on 7/25/2017.
 */

Survey = require('../models/survey.model');


module.exports = {
    index : index,
    store : store,
    show : show,
    destroy : destroy
};

function index(req,res) {
    Survey.find({}).exec()
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
}

function store(req,res) {
   let survey = new Survey(req.body);

   survey.save()
       .then((data) => res.send(data))
       .catch((err) => res.send(err));


}

function show(req,res) {
    let id = req.param.id;

    Survey.findOne({id_student: id})
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
}

function destroy(req,res) {

    let id = req.param.id;

    Survey.findOne({id_student: id})
        .then((data) => {
            return data.remove();
        })
        .catch((data) => res.send(data))
        .catch((err) => res.send(err));

}