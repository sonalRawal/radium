const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const BookController= require("../controllers/bookController")
const publisherController = require("../controllers/publisherController")



// Authors API
router.post('/authors',  authorController.createAuthor  );

// Books API
router.post('/books',  BookController.createBook  );
router.get('/getBooks',  BookController.getBooks  );

// publisher API
router.post('/publisher',  publisherController.createPublisher);



module.exports = router;