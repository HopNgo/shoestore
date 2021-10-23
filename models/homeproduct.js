var mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

var Schema = mongoose.Schema;
var homeproduct = new Schema({
    name: { type: String, required: true },
    costOld: { type: String, required: true },
    costNew: { type: String, required: true },
    img: { type: String, required: true },
    type: { type: String },
    gender: { type: String, required: true },
    brand: { type: String, required: true },
    slug: { type: String, slug: 'name' },

});

module.exports = mongoose.model('homeProduct', homeproduct);