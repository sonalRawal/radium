//const winston =  require('winston')

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

 
// for log format 
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});


const logger = createLogger({
        level: 'debug',
       // format: winston.format.json(),
        format: combine(timestamp({format : "HH:mm:ss"}), myFormat),     //{format : "HH:mm:ss"}
        transports: [ new transports.Console(),
          
          //  new transports.File({ filename: 'error.log', level: 'error' }),
          //   new transports.File({ filename: 'combined.log' }),
             
        ],
      });
      


module.exports =logger;