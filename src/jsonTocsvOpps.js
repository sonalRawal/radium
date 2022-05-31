// Import packages
const csvjson = require('csvjson')
const fileContent = require('./data2.json')
const convert = require('xml-js');
const html_tablify = require('html-tablify');
const fs = require('fs')
const pdf = require('html-pdf')
const json = fs.readFileSync('./data.json', 'utf8');

const options = { data : fileContent} 

const logger = require('./logger')

class ConvertData{
    constructor() {
        this.content 
        this.htmlContent
    }
    // Convert json to csv function
    csvData(jsonData) {
        
        this.content = csvjson.toCSV(jsonData, {
            headers: [{ id: 'key', title: 'key' }]
        })
         this.writeData('data.csv',this.content)
         return logger.info(`Data stored successfully <./data.csv> `)
    }
    // convert json to html
    htmlData(jsonData){
        this.content = html_tablify.tablify(jsonData)

         this.writeData('index.html',this.content)
         return logger.info(`Data stored into successfully <./index.html>`)
        
    }
    
    // conver json to xml
    xmlData(jsonData){
      this.content= convert.json2xml(jsonData, {compact: true, ignoreComment: true, spaces: 4});
       this.writeData('index.xml',this.content)
      return logger.info(`Data stored into successfully <./index.xml>`)
}

   // convert json to pdf
    pdfData(jsonData){
        this.htmlContent = this.htmlData(jsonData)  
        this.content= pdf.create(this.htmlContent,{format: 'Letter'}).toFile('./downloads/museum.pdf', function (err, result) {
            if (err) {
                return console.log(err)
            }
        })
        return logger.info('pdf downloaded successfully <./downloads/museum.pdf>')
    }
    
    // write data method 
   writeData(fileName,data){
     fs.writeFile(fileName,data, (err) => {
            if(err) {
                logger.error(err); 
                throw new Error(err);
            }
            logger.info(`Data stored into successfully`);
        });
        return 'data seved'
   }

}

// create new object 
const object = new ConvertData()


// object.csvData(fileContent)
// object.htmlData(options)
// object.writeData('my.json',json)
// object.xmlData(json)
//object.pdfData(options)

module.exports = object