const School = require('../models/school.model');

module.exports = {
    postSchool: postSchool,
    getSchools: getSchools,
    addNicks: addNicks,
    getOneSchool: getOneSchool
};

function postSchool(req,res){
    var school = new School(req.body);

    school.save()
        .then(() => res.send({'message': 'correct post added'}))
        .catch((err) => res.send(err));
}

function addNicks(req,res) {
    let nick = req.body.nick;

    School.findOne({slug:req.body.slug})
        .then((school) => {
            school.nicks.push({name : nick});
            return school.save();
        })
        .then((school) => {
            res.send(school);
        })
        .catch((err) => res.send(err));

}

function getSchools(req,res){
    
    School.find({})
        .then((results) => res.send(results))
        .catch((err) => res.send(err));
}

function getOneSchool(req, res){

    School.findOne({'nicks.name' : 'itch ii'})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => res.send(err));
}