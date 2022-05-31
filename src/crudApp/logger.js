
const { createLogger, format, transports} = require('winston');
const { combine, timestamp, printf,colorize,json,prettyPrint,cli } = format;

 
// for log format 
const myFormat = printf(({ level, message, timestamp}) => {
  return `{${timestamp} ${level} ${message}}`;
});

const logger = createLogger({
        level: 'debug',
        //format: combine(timestamp(),json()),
       defaultMeta: { service: 'user-service' },
        format: combine(timestamp(), myFormat),     //{format : "HH:mm:ss"}
        
        transports:  [ new transports.Console(),
          
          // - Write all logs with importance level of `error` or less to `error.log`
          // - Write all logs with importance level of `info` or less to `combined.log`
          //
            //new transports.File({ filename: 'error.log', level: 'error' }),
             new transports.File({ filename: 'combined.log' })
             
        ],
      });

module.exports = logger;