const path = require('path')
const express = require('express');
const upload = require('express-fileupload');
const db = require('./mysql');
const ejs = require('ejs')
const ejsLint = require('ejs-lint');
var bodyParser = require('body-parser');
const app = express()


app.set('views',path.join(__dirname,'views'))

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const logger = require('./logger')
const route = require('./route/route')

app.use(upload())
app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    logger.info('Express app running on port ' + (process.env.PORT || 3000))
    // Connect db
    db.connect((err) => {
        if (err) {
            logger.err(err);
        }
        logger.info('Mysql Connected...')
    })
})