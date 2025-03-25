const User = require('../models/userModel.js');

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Object} Newly created user object
 */
exports.registerUser = async (userData) => {
    const { name, email, mobileNumber, currentStatus, password } = userData;

    // Check if user already exists with email or mobile
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
        const error = new Error('Email already in use');
        error.statusCode = 400;
        throw error;
    }

    const existingUserMobile = await User.findOne({ mobileNumber });
    if (existingUserMobile) {
        const error = new Error('Mobile number already in use');
        error.statusCode = 400;
        throw error;
    }

    // Create user
    const user = await User.create({
        fullName: name,
        email,
        mobileNumber,
        currentStatus,
        password,
    });

    return user;
};

/**
 * Authenticate user and get token
 * @param {String} mobileNumber - User mobile number
 * @param {String} password - User password
 * @returns {Object} User object
 */
exports.loginUser = async (mobileNumber, password) => {
    const user = await User.findOne({ mobileNumber }).select('+password');

    if (!user) {
        const error = new Error('Invalid mobile number or password');
        error.statusCode = 401;
        throw error;
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        const error = new Error('Invalid mobile number or password');
        error.statusCode = 401;
        throw error;
    }

    return user;
};

/**
 * Get user profile
 * @param {String} userId - User ID
 * @returns {Object} User object
 */
exports.getUserProfile = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    return user;
};