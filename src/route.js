const express = require('express');
const router = express.Router();

const handler = require('./main')

 router.get("/getid", handler.getIds)
 router.post("/create/csv", handler.getMuseumData)
 
module.exports = router;