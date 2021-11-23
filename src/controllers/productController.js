const productModel= require("../models/productModel.js")

const createProduct= async function (req, res) {   
    let productData= req.body
     let savedProductData= await productModel.create(productData)
     res.send({msg: savedProductData})    
 }



 module.exports.createProduct= createProduct
 
 