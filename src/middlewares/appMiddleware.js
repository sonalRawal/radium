const jwt = require('jsonwebtoken')

const checkToken = async function(req, res, next) {
    let token = req.headers['x-auth-token']
    if(!token){
        res.send({msg : "missing token"})
    }else{ 
    let validateToken = jwt.verify(token, "radium")
     if(validateToken) {
         if(validateToken._id == req.params.userId){
             next();
         }
         else{
             res.send({status : "false" , msg : "user not found"}) ;
         }
    }else{
        res.send({status : "false" , msg : "invalid token"})
    }
  }
}
module.exports.checkToken = checkToken