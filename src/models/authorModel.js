const mongoose=require('mongoose')

const AuthorSchema= new mongoose.Schema({
    author_Id: {
        type: Number ,
        required: true
        
    },
    author_Name: {
        type: String,
        required: true
        
    },
    
    age : Number ,
    address : String 
    
},{ timestamps: true })

    
module.exports = mongoose.model( 'Authors', AuthorSchema ) 