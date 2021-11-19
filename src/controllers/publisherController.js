const publisherModel = require("../models/publisherModel.js")



// 4. Write a post api that creates a publisher resource from the details in the request body


const createPublisher = async function (req, res) {
    var data = req.body
    let savedData = await publisherModel.create(data)
    res.send({ msg: savedData })
}


module.exports.createPublisher = createPublisher