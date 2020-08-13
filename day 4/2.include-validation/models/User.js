const mongoose = require('mongoose');

// Schema object template connected to database
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

// exports template as constructor 'User'
module.exports = mongoose.model('User', UserSchema);