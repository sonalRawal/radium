const bookModel =require("../models/bookModel.js");
const authorModel = require("../models/authorModel.js")
const publisherModel = require("../models/publisherModel.js");
const mongoose = require("mongoose");

/*2.  Write a create book api that takes author from the request body. You have to first
 check if this is a valid authorId. A valid authorId is which is present in your authors
  collection. 
  Also make sure you receive a publisherId in the request and validate this id. A valid publisherId is which is present in your publishers collection.

  */

const createBook = async function (req, res) {
  let data = req.body
  let authorId = req.body.author
  let authorData = await authorModel.findById(authorId)

  if(authorData){
    let publisherId = req.body.publisher
    let publisher = await publisherModel.findById(publisherId)
       if(publisher){
        const  createBook =  await bookModel.create(data)
         res.send({ msg:createBook});
      }
      
  }else{
    res.send({msg: "invalid id"})
  }
}

/*3. Write a get books api that fetches all the books along with their author details 
(you have to populate author)
5. Update the 3rd api (GET /books) such that in the authors details you receive _id, author_name
 and age.

*/


const getBooks = async function (req, res) {
  let allBooks = await bookModel.find().populate('author', {author_name : 1,  age: 1, _id:1}).populate('publisher')

     res.send({msg : allBooks})
}
module.exports.createBook = createBook;
module.exports.getBooks = getBooks;
