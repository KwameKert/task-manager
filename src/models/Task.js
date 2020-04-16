const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('tasks',{
    completed: {
        type: Boolean,
        required: true,
        default:false
    },
    description: {
        type: String, 
        required: true
    },
    owener: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});


module.exports = Task