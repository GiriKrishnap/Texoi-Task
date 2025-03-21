const Feedback = require('../models/feedbackModel');
const TestResult = require('../models/testResultModel');

/**
 * Submit feedback for a test
 * @param {String} userId - User ID
 * @param {String} testId - Test result ID
 * @param {String} emoji - Feedback emoji
 * @param {String} comment - Optional comment
 * @returns {Object} Feedback object
 */
exports.submitFeedback = async (userId, testId, emoji, comment = '') => {
    // Check if test exists and belongs to user
    const testResult = await TestResult.findOne({
        _id: testId,
        user: userId,
    });

    if (!testResult) {
        const error = new Error('Test result not found or does not belong to user');
        error.statusCode = 404;
        throw error;
    }

    // Check if feedback already exists for this test
    const existingFeedback = await Feedback.findOne({ testResult: testId });
    if (existingFeedback) {
        const error = new Error('Feedback already submitted for this test');
        error.statusCode = 400;
        throw error;
    }

    // Create feedback
    const feedback = await Feedback.create({
        user: userId,
        testResult: testId,
        emoji,
        comment,
    });

    return feedback;
};

/**
 * Get feedback for a test
 * @param {String} testId - Test result ID
 * @returns {Object} Feedback object
 */
exports.getFeedback = async (testId) => {
    const feedback = await Feedback.findOne({ testResult: testId });

    if (!feedback) {
        const error = new Error('Feedback not found for this test');
        error.statusCode = 404;
        throw error;
    }

    return feedback;
};

