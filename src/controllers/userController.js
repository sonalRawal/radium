const UserModel= require("../models/userModel.js")

// Today's assignment
const createUser= async function (req, res) {   
   let userData= req.body
   console.log(req.headers)

    userData.freeAppUser
    let savedUserData= await UserModel.create(data)
    res.send({msg: savedData})    
}



module.exports.createUser= createUser

