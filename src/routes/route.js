const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")

const UserController= require("../controllers/userController")
const ProductController = require("../controllers/productController");
const middlewares = require("../middlewares/commonMiddlewares")
const orderController = require('../controllers/orderController')

router.post('/createUser', middlewares.midValidation , UserController.createUser);
router.post('/createProduct', ProductController.createProduct);
router.post('/orders', middlewares.midValidation , orderController.createOrder);





module.exports = router;


 