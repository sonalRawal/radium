const express = require('express');
const router = express.Router();
const newBookModel = require("../models/newBookModel")
const  authorModel = require("../models/authorModel")

const NewController= require("../controllers/newController")




router.post('/createNewBook',   NewController.createNewBook);
router.post('/createNewAuthor',  NewController.createAuthor);
router.get('/getBookByAuthor',  NewController.getBookByAuthor);
router.get('/updateData',       NewController.updateData);
router.get('/authorByPrice',    NewController.authorByPrice );



module.exports = router;