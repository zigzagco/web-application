const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    postId:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    text:{
        type: Array,
        required: true
    },
    imgUri:{
        type:String,
        required: true
    },
    keywords:{
        type:Array,
        required: true
    },
    en_keywords:{
        type:Array,
    },
    time:{type:String},
    date:{type:String},
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})

module.exports = mongoose.model('Post',schema)