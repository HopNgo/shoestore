var mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

var Schema = mongoose.Schema;
var cart = new Schema({
    emailUser: { type: String, required: true },
    items: { type: Object, required: true },
    totalPrice: { type: String, required: true },
    totalQty: { type: String, require: true }

});

module.exports = mongoose.model('cart', cart);