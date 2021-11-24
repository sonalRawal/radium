const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createUser = async function (req, res) {
    let userDetails = req.body 
    let userCreated = await userModel.create(userDetails)
    res.send({data: userCreated})
}


//For JWT session
const login = async function (req, res) {
    userName = req.body.name
    userPassword = req.body.password

    let user = await userModel.findOne({name: userName, password: userPassword, isDeleted: false})
    if(user) {
        let payload = {_id: user._id , "mobile" : user.mobile }
        const generatedToken = jwt.sign(payload, "radium")

        res.header('x-auth-token',generatedToken) ; // add new header in response 
        res.send({status: true, data: user._id, token: generatedToken})
    } else {
        res.send({status: false, message: 'Invalid credentials'})
    }
}

//For JWT session
const getDetailsById = async function (req, res) {
        // let token = req.headers['x-auth-token']
        //   let decodedToken = jwt.verify(token, 'radium')
        //  if(decodedToken) {
       let userDetails = await userModel.findOne({_id: req.params.userId, isDeleted: false})
            if(userDetails) {
                res.send({status: true, data: userDetails})
            } else {
                res.send({status: false, message: 'User not found'})
            }

        // } else {
        //     res.send({status: false, message: 'Token not valid'})
        // }
    
}

//update data
 const updateData = async function(req , res){
//   let userData = await userModel.findOne({_id : req.params.userId})

//      if(userData){     
//    let updatedData = await userModel.findOneAndUpdate({_id : userData._id} ,{email : "sonarawal563@gmail.com"},{new: true})
      
//    res.send({updatedData})

let user=await userModel.findOne({_id:req.params.userId,isDeleted:false});
            user.email=req.body.email;
            //console.log(req.body.email);
            user.save();
            res.send({status:"True",Data:user});
        }
       
    //  }else{

    //     res.send({msg : "error"})
    // }


module.exports.createUser = createUser
module.exports.getDetailsById = getDetailsById
module.exports.login = login
module.exports.updateData = updateData
