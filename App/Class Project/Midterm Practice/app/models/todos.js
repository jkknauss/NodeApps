var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var todoSchema = new Schema({
    todo: { type: String, require: true },
    priority: { type: String, require: true, enum: ['Critical', 'High', 'Medium', 'Low'] },
    dateDue: { type: Date, default: Date.now },

});

module.exports =
    Mongoose.model('Todo', todoSchema);