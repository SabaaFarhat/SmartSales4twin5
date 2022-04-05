//import mongoose 
const mongoose = require('mongoose')
const { isEmail } = require('validator');


//generate schema
const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required: [true, 'Please enter your first name'],
    },
    lastName: {
        type : String,
        required: [true, 'Please enter your last name'],
    },
    email: {
        type : String,
        required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type : String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    dateOfBirth: {
        type : String,
    },
    tel: {
        type : String,
        required: [true, 'Please enter your phone number'],
    },
    role:String
    
}
)

//generate model
const User = mongoose.model('user' , userSchema)



//export model
module.exports = User;