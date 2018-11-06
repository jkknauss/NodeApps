var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var foobarSchema = new Schema({
    foo: {type: String, require: true },
    woo: {type: Number },
    dateDue: { type: Date, default: Date.now },

});

module.exports =
    Mongoose.model('Foobar', foobarSchema);