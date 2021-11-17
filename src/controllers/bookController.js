const BookModel= require("../models/bookModel.js")
const mongoose= require("mongoose")


//1.createBook : to create a new entry..use this api to create 11+ entries in your collection
const createBook = async function (req, res) {
    let  book= req.body
    let savedBook= await BookModel.create(book)
    res.send({msg: savedBook})
}

//2.bookList : gives all the books- their bookName and authorName only
const getBooksData= async function (req, res) {
    let allBooks = await BookModel.find().select({ bookName:1, authorName:1})
    res.send({msg: allBooks})        
}

 //3.getBooksInYear: takes year as input in post request and gives list of all books published that year
const getInYear =  async function (req, res) {
    let bookInYear = await BookModel.find( { year: req.body.year } )
    res.send({msg: bookInYear})        
}
/* 4.getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as
 a condition to fetch books that satisfy that condition 
> e.g if body had { name: “hi”} then you would fetch the books with this name
>if body had { year: 2020} then you would fetch the books with this name
> hence the condition will differ based on what you input in the request body */

const getParBooks = async function (req, res) {
    let particularBooks = await BookModel.find(req.body ) //has the word java 
    res.send({msg: particularBooks})        
}

//5.getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR”
const getInBooks = async function (req, res) {
    let inBooks = await BookModel.find({ 'prices.indianPrice' : {$in: ["100INR", "200INR", "500INR"] } } )
    res.send({msg: inBooks}) 

}

//6.getRandomBooks - returns books that are available in stock or have more than 500 pages 
const getAvailableBooks = async function (req, res) {
    let booksAvailable = await BookModel.find({ $or: [ {stockAvailable: true} , { totalPages: {$gt: 500} }   ] } )
    res.send({msg: booksAvailable})
 
}
       
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getInYear = getInYear
module.exports.getParBooks = getParBooks
module.exports.getInBooks = getInBooks 
module.exports.getAvailableBooks = getAvailableBooks
