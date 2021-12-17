const express = require('express');
const router = express.Router();

const bookController= require('../controllers/bookController')
const reviewController= require('../controllers/reviewController')
const userController= require('../controllers/userController')
const middleware = require('../middleware/loginmiddle')

//user api 
 router.post("/register", userController.createUser)
 router.post("/login", userController.loginUser)

// //book api
 router.post("/books",middleware ,bookController.createBook)
 router.get("/books",middleware, bookController.getBooks)
 router.get("/books/:bookId",middleware ,bookController.bookDetails)
 router.put("/books/:bookId",middleware,bookController.updateBook)
 router.delete("/books/:bookId",middleware ,bookController.deleteBook)

// //review api
// router.post("/books/:bookId/review",middleware , reviewController.)
// router.put("/books/:bookId/review/:reviewId",middleware ,reviewController.)
// router.delete("/books/:bookId/review/:reviewId",middleware,reviewController.)





module.exports = router;