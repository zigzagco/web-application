const mongoose = require("mongoose");
const Schema = mongoose.Schema

const schema = new Schema({
    keywords:{type: String},
    en_keywords:{type:String},
})
module.exports = mongoose.model('Dir',schema)