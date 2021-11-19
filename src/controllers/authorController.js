const authorModel= require("../models/authorModel.js")

//1. Write a create author api that creates an author from the details in request body

const createAuthor= async function (req, res) {
    let data= req.body
    let savedData= await authorModel.create(data)
    res.send({msg: savedData})    
}




module.exports.createAuthor= createAuthor;
