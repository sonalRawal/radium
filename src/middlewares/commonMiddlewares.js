let  midValidation = function(req,res,next){
 let conform = req.headers['isfreeapp']
 console.log(conform);
 let isAppFree 
  if(!conform){
      res.send({msg : "missing a mandatory header"})
  }
  if(conform === 'false'){
      isAppFree = false 
  }else{
  isAppFree = true
  }
  req.isFreeAppUser = isAppFree

  next()
}


module.exports.midValidation = midValidation

