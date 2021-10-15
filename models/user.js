
var bcrypt = require('bcrypt');

var mongoose = require('mongoose');

// định nghĩ cấu trúc user model
var Schema = mongoose.Schema;
var schema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true }
});

schema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, 10);
}
schema.methods.authPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', schema);

