function log(name){
  console.log("my name is "+ name) 
    
}

function welcome(){
   console.log ("Welcome to my application. I am sonal from functionup." )   
}

const url = 'http://mylogginngsystem.com/log'

module.exports.newlog = log
module.exports.plzCome= welcome
module.exports.newurl = url
