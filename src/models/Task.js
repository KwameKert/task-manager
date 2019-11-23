const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('tasks',{
    completed: {
        type: Boolean,
        required: true,
        default:false
    },
    description: {
        type: String, 
        required: true
    }
});


module.exports = User