const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define Model
const itemSchema = new Schema({
  name: { type: String, unique: true, lowercase: true },
  price: String
});

//create a model class

const modelClass = mongoose.model('item', itemSchema);

//export model
module.exports = modelClass;
