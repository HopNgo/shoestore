
var mongoose = require('mongoose');

// định nghĩ cấu trúc user model
var Schema = mongoose.Schema;
var schema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true }
});


module.exports = mongoose.model('user', schema);

