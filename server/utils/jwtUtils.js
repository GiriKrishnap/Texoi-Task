const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Generate JWT token for user
 * @param {Object} user - User object with id
 * @returns {String} JWT token
 */
exports.generateToken = (user) => {
    return jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRE,
    });
};