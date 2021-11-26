const axios = require("axios");
const cryptoModel = require("../model/cryptoModel")
const getCrypto = async function (req, res) {
  /*Read the initial pages of the documentation till the first api i.e. /assets api  : https://docs.coincap.io/
  	
  >> ignore most of the stuff ( it might seem very verbose at this stage) and just try to get a basic idea 
  
  --------Problem-------
  Now create an API key from the section which says  “Request API Key- Click here to request your API key”
  	
  the “HEADER” section above it also contains details on how to use this API key
      	
  “set the header field Authorization=Bearer XXXX” :- you have to create a header named “Authorization” and 
  set its value to “Bearer XXXX” where XXXX stands for the API key that you have generated above
  	
  Now the assignment is to create an API that does the following ( one single API and not multiple seperate API’s)
  ------Problem 1 -------	
  Get the list of all the top 100 cryptocurrency 
  coins in the world using the /assets api ( the first api mentioned in the documentation)
  */
  let option = {

    method: "get",
    url: "http://api.coincap.io/v2/assets",
    headers: {
      'Authorization': 'Bearer 2caa952c-b6d0-40f0-9703-7d1cf1b17e3e'
    }

  }

  let response = await axios(option)
  //res.status(200).send(response.data)
  /*------Problem 2-------
  Save all the 100 coins in database ( each document to have data of 1 coin)
	

  	
The schema should have the following 4 keys:
{
"symbol" // String and Unqiue
"name": // String and Unqiue
"marketCapUsd": // String  ( not Number)
"priceUsd": //String
}
Notice that changePercent24Hr key is not present in the schema or colletion
*/

  let list = response.data.data
  for (i in list) {

    let cryptoData = {
      symbol: list[i].symbol,
      name: list[i].name,
      marketCapUsd: list[i].marketCapUsd,
      priceUsd: list[i].priceUsd
    }

    let cryptoStrucure = await cryptoModel.create(cryptoData)
  }
  /*------Problem 3------
Send back the list of all the coins sorted in order of their growth in last 24hours   i.e. sort
 all the 100 coins based on their changePercent24Hr and send the sorted array in response
The above has to be done in one single API and not multiple seperate API’s. SO go step by step and build 
features into your API one by */

  let final = []
  for (i in list) {
    final.push({ "name": list[i].name, "changePercent24Hr": list[i].changePercent24Hr })
  }
  let hrChanges = final.sort(function (a, b) { return b.changePercent24Hr - a.changePercent24Hr })

  res.status(200).send({ status: true, Data: hrChanges })



}

// extra api by id get coin detail
const getCoin = async function (req, res) {

  try {
    let id = req.query.id
    let option = {
      method: "get",
      url: `http://api.coincap.io/v2/assets/?id${id}`,
      headers: {
        'Authorization': 'Bearer 2caa952c-b6d0-40f0-9703-7d1cf1b17e3e'
      }

    }
    let response = await axios(option)
    let list = response.data.data
    let result
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        result = list[i]
      }
    }
    console.log(result)
    if (!result) {
      return res.send({ status: false, message: "nos such id" })
    } else {
      return res.send({ status: true, data: result })
    }

  } catch (err) {
    res.status(500).send({ status: true, msg: err.message })
  }
}


module.exports = {
  getCrypto, getCoin
}