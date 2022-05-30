const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csvtojson')
const fs = require('fs')
const axios = require("axios");
const flatten = require('flat');
const { title } = require('process');
const winston = require('winston')
const logger = require('./logger');
const { resourceLimits } = require('worker_threads');
const { get } = require('express/lib/response');


const dataLogger = logger.child({ id: `66tyh` })

const getIds = async function (req, res) {
  try {

    let option = {

      method: "get",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/objects",
    }
    
    let response = await axios(option)
    logger.info('got response successfully')
    let list = response.data


    res.status(200).send({ status: true, data: list })
  }
  catch (err) {
    logger.error(err)
    res.status(500).send({ status: false, msg: err.massege })
  }


}

const getMuseumData = async function (req, res) {
  try {
    let ids = req.body.ids
    logger.debug(`INPUT PARAM ${ids}`)
    
    let results = []
    for (let i = 1; i <= ids; i++) {
      let option = {
        method: "get",
        url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${i}`,
      }
      let test = await axios(option)
      results.push(test.data)
      logger.debug(`data for id ${i}  method:get`)
    }

    if (results.length < 1) {
      logger.warn('data not received from museum api')
      
    }
    let responseData = { ...results }
    let passData = JSON.stringify(flatten(responseData))
    fs.writeFile("data.json", passData, "utf-8", (err) => {

      if (err) logger.error(err);
      else logger.info("Data saved in json file");
    });
    res.status(200).send({ status: true, data: results })

  } catch (err) {
    logger.error(err)
    res.status(500).send({ status: false, msg: err.massege })
  }

}

module.exports = { getIds, getMuseumData }