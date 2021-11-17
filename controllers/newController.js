const NewBookModel= require("../models/newBookModel.js")
const authorModel= require("../models/authorModel.js")

const mongoose= require("mongoose")

/*1. Write down the schemas for book and authors (keeping the data given below in mind). 
Also create the documents (corresponding to the data given below) in your database.

2. CRUD operations. Write API's to do the following:	
Write create APIs for both books and authors ---> If author_id is not available 
then do not accept the entry(in neither the aurthor collection onr the books collection)
*/
const createAuthor = async function (req, res) {
    let  author= req.body
    if(author.author_Id){
    let savedAuthor= await AuthorModel.create(author)
    res.send({msg: savedAuthor})
    }else{
        res.send("author id add")
    }
}

const createBook = async function (req, res) {
    let  book= req.body
    if(book.author_Id){
        let savedBook= await NewBookModel.create(book)
        res.send({msg: savedBook})
    }else{
        res.send("author id add")
    }
}

const getBookByAuthor = async function (req, res) {
    let author= await authorModel.find({author_Name:"Chetan Bhagat"}).select({author_Id : 1})
    console.log(author)
    let authorId = author[0].author_Id
    console.log(authorId)
    let authorBooks = await NewBookModel.find({author_Id : authorId}).select({Book_Name :0})
    console.log(authorBooks)
    res.send({msg : authorBooks})
}
const updateData= async function (req, res) {
    let books= await NewBookModel.find({Book_Name : "Two states"})
    let Id = books[0].author_Id
    let AuthorName = await authorModel.find({author_Id : Id}).select({author_Name : 1})

    let updated= await NewBookModel.findOneAndUpdate({Book_Name : "Two states"}, {price : 100}, {new : true}).select({Book_Name : 0 , price:1})
    
    res.send({msg:  updated, AuthorName})
}
const authorByPrice= async function (req, res) {
     let booksPrice = await NewBookModel.find({price:{$gte: 50, $lte: 100}}).select({author_Id: 1})

     let id = booksPrice[0].author_Id
     console.log(id)
     let author = await authorModel.find({author_Id : id}).select({author_Name : 1})
    res.send({msg: author})
}


module.exports.createAuthor = createAuthor 
module.exports.createNewBook = createBook
module.exports.getBookByAuthor = getBookByAuthor
module.exports.updateData = updateData
module.exports.authorByPrice = authorByPrice