const mongoose = require('mongoose')
const validator = require('validator')


//creating user model 
const User = mongoose.model('users', {
    name : {
        type: String,
        required: true,
        trim: true
    },
    email: {
     type: String,
     required: true,
     trim:true,
     lowercase: true,
     validate(value) {
         if(!validator.isEmail(value)){
             throw new Error('Email is invalid')
         }
     }
    },
    age : {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Please choose another password')
            }
        }
    }

})



module.exports = User
 