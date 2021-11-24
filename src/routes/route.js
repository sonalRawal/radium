const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

const Middleware = require('../middlewares/appMiddleware')

router.post('/users',userController.createUser);
//For JWT session
router.get('/users/:userId',Middleware.checkToken, userController.getDetailsById)
//For JWT session
router.post('/login', userController.login)

router.put('/updatedUsers/:userId',Middleware.checkToken, userController.updateData)

module.exports = router;