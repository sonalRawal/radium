const NewBookModel= require("../models/newBookModel.js")
const AuthorModel= require("../models/authorModel.js")

const mongoose= require("mongoose")

/*1. Write down the schemas for book and authors (keeping the data given below in mind). 
Also create the documents (corresponding to the data given below) in your database.

2. CRUD operations. Write API's to do the following:	
Write create APIs for both books and authors ---> If author_id is not available 
then do not accept the entry(in neither the aurthor collection onr the books collection)
*/

const createBook = async function (req, res) {
    let  book= req.body
    let savedBook= await NewBookModel.create(book)
    res.send({msg: savedBook})
}
const getBookByAuthor = async function (req, res) {
    let author= await AuthorModel.find({author_Name : req.body.author_Name} )
    let authorId = author.author_Id
    let Books = await NewBookModel.find({author_Id : authorId})
    
    res.send({msg : Books})
}




module.exports.createNewBook = createBook
module.exports.getBookByAuthor = getBookByAuthor