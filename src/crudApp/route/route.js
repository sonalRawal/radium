const express = require('express');
const router = express.Router();
const handler = require('../hendler')


//create table
router.get('/createtable',handler.createTable)

// render file
router.get('/', handler.renderfile )

//create
router.post('/insert',handler.insertData)

//show
router.get('/show',handler.show)

//edit
router.get('/edit/:id',handler.edit)

//upload
router.post('/upload', handler.uploadFile )

//Read
router.get('/getdata',handler.getData)

//get By id
router.get('/get/:id',handler.getDataById)

//Update
router.post('/update/:id',handler.updateData)

//Delete
router.get('/delete/:id',handler.deleteByID)


module.exports = router;