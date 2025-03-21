const { validationResult } = require('express-validator');
const authService = require('../services/authService');
const { generateToken } = require('../utils/jwtUtils');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.registerUser = async (req, res, next) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: errors.array()[0].msg,
            });
        }

        // Register user
        const user = await authService.registerUser(req.body);

        // Generate token
        const token = generateToken(user);

        // Send response
        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    fullName: user.name,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    currentStatus: user.currentStatus,
                },
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.loginUser = async (req, res, next) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: errors.array()[0].msg,
            });
        }

        const { mobileNumber, password } = req.body;

        // Login user
        const user = await authService.loginUser(mobileNumber, password);

        // Generate token
        const token = generateToken(user);

        // Send response
        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    currentStatus: user.currentStatus,
                },
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
exports.getUserProfile = async (req, res, next) => {
    try {
        // Get user profile
        const user = await authService.getUserProfile(req.user._id);

        // Send response
        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    currentStatus: user.currentStatus,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};