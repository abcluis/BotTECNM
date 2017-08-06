const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('../utils/slugify');

const CareerSchema = new Schema({
    name : {
        type : String,
        unique : true
    }
});

const SchoolSchema = new Schema({
    name: String,
    slug: {
        type: String,
        unique: true
    },
    nick : String,
    state : String,
    careers : [CareerSchema]
});

SchoolSchema.pre('save', function(next){
    this.slug = slugify(this.name);
    next();
});


const school = mongoose.model('School', SchoolSchema);

module.exports = school;

