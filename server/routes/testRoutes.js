const express = require('express');
const router = express.Router();
const {
  getQuestions,
  submitTest,
  getTestResult,
  getUserTests
} = require('../controllers/testController');
const { protect } = require('../middlewares/authMiddleware');

// All routes are protected
router.use(protect);

router.get('/questions', getQuestions);
router.post('/submit', submitTest);
router.get('/get-result', getTestResult);
router.get('/', getUserTests);

module.exports = router;