const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('../utils/slugify');

const SchoolSchema = new Schema({
    name: String,
    slug: {
        type: String,
        unique: true
    },
    state : String
});

SchoolSchema.pre('save', function(next){
    this.slug = slugify(this.name);
    next();
});

const school = mongoose.model('School', SchoolSchema);

module.exports = school;

