const express = require('express');
const router = express.Router();
const { registerUser, loginUser, checkCompleted } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { registerValidator, loginValidator } = require('../utils/validators');

// Public routes
router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);

// Protected routes
router.get('/completed', protect, checkCompleted);

module.exports = router;