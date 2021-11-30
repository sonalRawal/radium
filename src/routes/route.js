const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")


 
//API's
router.post('/authors',  authorController.createAuthor);
 router.post('/blogs',   blogController.createBlogs);
 router.get('/blogs',   blogController.getBlogs);
 router.put('/blogs/:blogId',  blogController.updateBlog);
 router.get('/blogs/:blogId',  blogController.checkdeletestatus);
 router.get('/blogs1',  blogController.deletebyparams);
 

module.exports = router;