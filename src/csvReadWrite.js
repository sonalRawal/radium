// Import package csvjson
const csvjson = require('csvjson')

const logger = require('./logger')
  
// Import fs package(file system) 
// for read and write files
const fs = require('fs')
const readFile = fs.readFile;
const writeFile = fs.writeFile;


  
// Reading json file(filename -data.json)
readFile('./data.json', 'utf-8', (err, fileContent) => {
    if (err) {
        // Doing something to handle the error or just throw it
        logger.error(err); 
        throw new Error(err);
    }
  
    // Convert json to csv function
    const csvData = csvjson.toCSV(fileContent, {
        headers: [{id:'key',title:'key'}]
    });
  
    // Write data into csv file named college_data.csv
    writeFile('data.csv', csvData, (err) => {
        if(err) {
            // Do something to handle the error or just throw it
            logger.error(err); 
            throw new Error(err);
        }
        logger.info(`Data stored into ${'./data.csv'} successfully`);
    });
});