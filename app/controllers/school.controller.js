const School = require('../models/school.model');

module.exports = {
    postSchool: postSchool,
    getSchools: getSchools
}

function postSchool(req,res){
    var school = new School(req.body);

    school.save()
        .then(() => res.send({'message': 'correct post added'}))
        .catch((err) => res.send(err));
}

function getSchools(req,res){
    
    School.find({})
        .then((results) => res.send(results))
        .catch((err) => res.send(err));
}
