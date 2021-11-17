const express = require('express');
const router = express.Router();
//const UserModel= require("../models/userModel")
const BookModel= require("../models/userModel")

//const UserController= require("../controllers/userController")
const BookController = require("../controllers/userController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
// router.post('/createUser',  UserController.createUser  );
// router.get('/getAllUsers',  UserController.getUsersData  );
router.post('/createNewBook', BookController.createBook  );
router.get('/getAllBooks',  BookController.getBooksData  );



module.exports = router;