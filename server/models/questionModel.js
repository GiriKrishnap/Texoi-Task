const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Question text is required'],
            trim: true,
        },
        options: [
            {
                text: {
                    type: String,
                    required: true,
                },
                isCorrect: {
                    type: Boolean,
                    required: true,
                    default: false,
                },
            },
        ],
        explanation: {
            type: String,
            default: '',
        },
        pointValue: {
            type: Number,
            default: 5,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Question', questionSchema);