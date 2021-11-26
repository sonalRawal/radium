const express = require('express');
const router = express.Router();


const cryptoController= require("../controllers/cryptoController")



//Assignment API ...get crypton
router.get("/getCrypto",cryptoController.getCrypto)





//extra api get coin by id
router.get("/getCryptoById",cryptoController.getCoin)

module.exports = router;