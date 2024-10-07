const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Workout', workoutSchema );
