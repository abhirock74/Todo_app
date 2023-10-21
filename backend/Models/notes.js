const { default: mongoose, now } = require("mongoose");

const taskSchema = new mongoose.Schema({
    tasks: {
        type: String,
        required: true,
    },
    page: {
        type: String,
        required: false,
    },
    icon: {
        type: String,
        required: false,
    },
    createdAt: {
        type: String,
    },
    modifiedAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false  
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false  
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }
});


const notes = mongoose.model('notes', taskSchema);
module.exports = notes