const express = require('express');
const router = express.Router();
const {
    submitFeedback,
    getFeedback
} = require('../controllers/feedbackController');
const { protect } = require('../middlewares/authMiddleware');
const { feedbackValidator } = require('../utils/validators');

// All routes are protected
router.use(protect);

router.post('/submit', feedbackValidator, submitFeedback);
router.get('/:testId', getFeedback);

module.exports = router;