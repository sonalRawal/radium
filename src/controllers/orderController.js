const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')
const productModel = require('../models/productModel')

const createOrder = async function (req, res) {
    // user validation
    let userId = req.body.userId
    let productId = req.body.productId
    
    let isFreeApp = req.isFreeAppUser//This attribute was set in the appMiddleware
    let orderAmount
    let orderDate = Date()
    
    //user validation
    let user = await userModel.findById(userId)
    if(!user) {
        return res.send({message: "User doesn't exist. Please provide a valid userId"})
    }

    //product validation
    let product  = await productModel.findById(productId)
    if(!product) {
        return res.send({message: "Product doesn't exist. Please provide a valid productId"})
    }

    //user balance validation
    if(!isFreeApp && user.balance < product.price) {
        return res.send({message: "User doesn't have enough balance to purchase the product"})
    }

    if(isFreeApp){
        orderAmount = 0
    } else {
        //paid app
        orderAmount = product.price
    }

    let orderDetails = {
        userId: userId,
        productId: productId,
        amount: orderAmount,
        isFreeAppUser: isFreeApp, 
        date: orderDate
    }

    let orderCreated = await orderModel.create(orderDetails)
    
   if(!isFreeApp) {
       await userModel.findOneAndUpdate({_id: userId}, {balance: user.balance - product.price})
   }

   res.send({data: orderCreated})

}

module.exports.createOrder = createOrder