const mysql = require('mysql')

const dbName = process.env["DB_NAME"];
const dbPassword = process.env["DB_PASSWORD"];

// Create connection 
const db = mysql.createConnection({
    host : 'localhost' ,
    user : 'root' ,
    password : dbPassword ,
    database : dbName    
}) 


module.exports = db 