const mongoose = require("mongoose")
const validate = require("../validation/validator")


const userSchema = new mongoose.Schema({


    title: { type: String, required: true, enum: ["Mr", "Mrs", "Miss"] },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: {
        type: String, required: true, unique: true
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        pincode: { type: String }
    },
},{ timestamps: true })


module.exports = mongoose.model('user', userSchema)