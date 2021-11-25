const express = require('express');
const router = express.Router();

const cowinController= require("../controllers/cowinController")
const tempController = require("../controllers/tempController")
router.get("/cowin/states", cowinController.getStatesList)
router.get("/cowin/districts/:stateId", cowinController.getDistrictsList)
router.get("/cowin/centers", cowinController.getByPin)
router.post("/cowin/getOtp", cowinController.getOtp)
router.get("/weather/temreture",tempController.getWeather)

router.get("/cityWeather/temreture",tempController.getCityWeather)
module.exports = router;