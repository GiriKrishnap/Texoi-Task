const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        testResult: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'TestResult',
        },
        emoji: {
            type: String,
            required: [true, 'Please select an emoji for feedback'],
        },
        comment: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Feedback', feedbackSchema);