const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema=new mongoose.Schema({
    userId: ObjectId ,
    productI : ObjectId,
     amount: Number,
  isFreeAppUser: Boolean, 
date : { type:String , fomate:Date}

}, {timestamps: true} )

module.exports = mongoose.model( "order", orderSchema) 

