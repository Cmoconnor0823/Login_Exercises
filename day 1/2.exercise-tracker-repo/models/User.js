const mongoose = require('mongoose');

// Schema object template connected to database
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: false,
        default: Date.now()
    },


});

// exports template as constructor 'User'
module.exports = mongoose.model('User', UserSchema);