const mongoose = require('mongoose');
const validator = require('validator');


const tasksSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        require: true,
        maxLength: 250,
        validate(value) {
            if(validator.isEmpty(value)) {
                throw new Error("Description field cannot be empty!!");
            }
        }
    },
    completed: {
        type: Boolean,
        default: false,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
   
},{
    timestamps: true
});

const Task = mongoose.model('tasks', tasksSchema)

module.exports = Task;