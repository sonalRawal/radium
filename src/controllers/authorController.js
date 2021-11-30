const AuthorModel= require("../models/authorModel.js")


const createAuthor= async function (req, res) {
    let authorDetails = req.body
   let savedAuthorData = await AuthorModel.create(authorDetails)
     res.send({msg: savedAuthorData})    
 }

 module.exports.createAuthor =createAuthor