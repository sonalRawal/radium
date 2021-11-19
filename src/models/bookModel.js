const mongoose = require('mongoose')
//const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema= new mongoose.Schema({

    bookName: {
        type: String,
        required: true
    },
    
    author: {
        type:  mongoose.Schema.Types.ObjectId ,
        ref: 'MyAuthor'
    },
    
    price : Number ,
    ratings : Number ,
    publisher :{
        type:  mongoose.Schema.Types.ObjectId ,
        ref: 'Mypublisher'
    
    }
  
},{timestamps: true} )

module.exports = mongoose.model( 'MyBook', bookSchema ) 

