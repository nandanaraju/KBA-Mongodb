const { Schema } = require('mongoose');
const { model } = require('mongoose');
const demo = new Schema({
    userid: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true }
    // place:{ type: String, required: true}
    // Add other fields as needed
});


const sample = model('details', demo);
module.exports = sample;