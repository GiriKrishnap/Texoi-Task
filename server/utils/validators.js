const { body } = require('express-validator');

/**
 * Validation rules for user registration
 */
exports.registerValidator = [
    body('fullName')
        .notEmpty()
        .withMessage('Full name is required')
        .trim(),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('mobileNumber')
        .notEmpty()
        .withMessage('Mobile number is required')
        .matches(/^[0-9]{10}$/)
        .withMessage('Please enter a valid 10-digit mobile number'),
    body('currentStatus')
        .isIn(['Student', 'Employee'])
        .withMessage('Current status must be either Student or Employee'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

/**
 * Validation rules for user login
 */
exports.loginValidator = [
    body('mobileNumber')
        .notEmpty()
        .withMessage('Mobile number is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

/**
 * Validation rules for feedback
 */
exports.feedbackValidator = [
    body('emoji')
        .notEmpty()
        .withMessage('Emoji is required'),
];