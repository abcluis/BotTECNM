const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    id:   {
        type:   Number,
        unique: true
    },
    name: String,
    created_at: Date
});

userSchema.pre('save', function (next) {
    this.created_at = new Date();
    next();
});

const user = mongoose.model('User', userSchema);

module.exports = user;