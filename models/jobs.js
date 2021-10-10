const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, "Please provide company"],
        maxlength: 50,
    },
    position:{
        type: String,
        required: [true, "Please provide position"],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'rejected'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: [true, "Please provide user"]
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Job", JobSchema)
