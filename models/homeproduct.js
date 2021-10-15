
var mongoose = require('mongoose');
// định nghĩ cấu trúc user model
var Schema = mongoose.Schema;
var homeproduct = new Schema({
    name: { type: String, required: true },
    costOld: { type: String, required: true },
    costNew: { type: String, required: true },
    img: { type: String, required: true },
    type: { type: String },
    gender: { type: String, required: true },
    brand: { type: String, required: true },

});

module.exports = mongoose.model('homeProduct', homeproduct);