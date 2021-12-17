const mongoose = require("mongoose")
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidTitle = function(title) {
    return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
}

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}


    module.exports = {isValid ,isValidRequestBody,validateEmail ,isValidTitle,isValidObjectId}