const mongoose = require('mongoose');
const validator = require('validator');



const taskSchema = new mongoose.Schema({
    completed: {
        type: Boolean,
        required: true,
        default:false
    },
    description: {
        type: String, 
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
});


const Task = mongoose.model('Task', taskSchema);


module.exports = Task