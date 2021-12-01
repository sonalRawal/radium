const AuthorModel = require("../models/authorModel.js")
const jwt = require("jsonwebtoken");

const createAuthor = async function (req, res) {
  let authorDetails = req.body
  let savedAuthorData = await AuthorModel.create(authorDetails)
  res.send({ msg: savedAuthorData })
}

module.exports.createAuthor = createAuthor


//phase 2 login
const login = async function (req, res) {
  let email = req.body.email
  let password = req.body.password
  
  if (email && password) {
    let user = await AuthorModel.findOne({ email: email, password: password })
    
    if (user) {
      let payload = { authorId: user["_id"] }
      var token = jwt.sign(payload, "radium-secret");
      res.send({ status: true, data: user, token: token })
    } else {
      res.send({ message: 'email or password are invalid or user is deleted' })
    }
  } else {
    res.send({ msg: "email and password are not given" })
  }

};

module.exports.login = login

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYxYTRiY2ZjODBmMWI4NmE1ZGNi
// NDhmNyIsImlhdCI6MTYzODM1NzU5Mn0.ABUpjyyoe342ajLZoHvKPtRVXq2LAq4oSNxEsLmycO0