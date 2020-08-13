const mongoose = require('mongoose');

// Schema object template connected to database
const UserSchema = new mongoose.Schema({


});

// exports template as constructor 'User'
module.exports = mongoose.model('User', UserSchema);