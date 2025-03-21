const { validationResult } = require('express-validator');
const feedbackService = require('../services/feedbackService');

/**
 * @desc    Submit feedback for a test
 * @route   POST /api/feedback
 * @access  Private
 */
exports.submitFeedback = async (req, res, next) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: errors.array()[0].msg,
            });
        }

        const { testId, emoji, comment } = req.body;

        // Validate test ID
        if (!testId) {
            return res.status(400).json({
                status: 'error',
                message: 'Test ID is required',
            });
        }

        // Submit feedback
        const feedback = await feedbackService.submitFeedback(
            req.user._id,
            testId,
            emoji,
            comment
        );

        // Send response
        res.status(201).json({
            status: 'success',
            data: {
                feedback: {
                    id: feedback._id,
                    emoji: feedback.emoji,
                    comment: feedback.comment,
                    createdAt: feedback.createdAt,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get feedback for a test
 * @route   GET /api/feedback/:testId
 * @access  Private
 */
exports.getFeedback = async (req, res, next) => {
    try {
        const { testId } = req.params;

        // Get feedback
        const feedback = await feedbackService.getFeedback(testId);

        // Send response
        res.status(200).json({
            status: 'success',
            data: {
                feedback: {
                    id: feedback._id,
                    emoji: feedback.emoji,
                    comment: feedback.comment,
                    createdAt: feedback.createdAt,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};