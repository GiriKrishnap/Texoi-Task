const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/userModel');

/**
 * Middleware to protect routes by verifying JWT tokens
 */
exports.protect = async (req, res, next) => {
    let token;

    // Check if token exists in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Not authorized to access this route',
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.JWT_SECRET);

        // Set user in req
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({
                status: 'error',
                message: 'User no longer exists',
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Not authorized to access this route',
        });
    }
};