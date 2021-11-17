const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    book_Name: {
        type: String
        
        
    },
    author_Id: {
        type: Number ,
        required: true
        
    },
    price : Number ,
    ratings : Number

}, { timestamps: true })
module.exports = mongoose.model('NewBooks', bookSchema)