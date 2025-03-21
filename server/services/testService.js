const Question = require('../models/questionModel');
const TestResult = require('../models/testResultModel');
const userModel = require('../models/userModel');

/**
 * Get questions for the test
 * @param {Number} limit - Number of questions to fetch (default 5)
 * @returns {Array} Array of questions
 */
exports.getQuestions = async (limit = 10) => {
  const questions = await Question.find().limit(limit);
  return questions;
};

/**
 * Save test results
 * @param {String} userId - User ID
 * @param {Array} answers - Array of user answers
 * @returns {Object} Test result object
 */
exports.saveTestResult = async (userId, answers) => {
  // Calculate score
  let totalScore = 0;
  const processedAnswers = [];

  const user = userId.toString()
  const existingUserId = await userModel.findById(user);
  if (existingUserId.completed === true) {
    const error = new Error('Already Done');
    error.statusCode = 400;
    throw error;
  }

  for (const answer of answers) {
    console.log('here - ', answer)
    const question = await Question.findById(answer.questionId);

    if (!question) {
      const error = new Error(`Question with ID ${answer.questionId} not found`);
      error.statusCode = 404;
      throw error;
    }

    // Find if selected option is correct
    const selectedOption = question.options.find(
      (opt) => opt._id.toString() === answer.selectedOptionId
    );

    if (!selectedOption) {
      const error = new Error(`Option with ID ${answer.selectedOptionId} not found`);
      error.statusCode = 404;
      throw error;
    }

    const isCorrect = selectedOption.isCorrect;

    // Add points if answer is correct
    if (isCorrect) {
      totalScore += question.pointValue;
    }

    // Add to processed answers
    processedAnswers.push({
      question: question._id,
      selectedOption: answer.selectedOptionId,
      isCorrect,
    });

    //to avoid reattempt
    await userModel.updateOne({ _id: userId }, { $set: { completed: true } })

  }

  // Create test result
  const testResult = await TestResult.create({
    user: userId,
    answers: processedAnswers,
    totalScore,
    totalQuestions: answers.length,
  });

  return testResult;
};

/**
 * Get test result by ID
 * @param {String} userId - Test result ID
 * @returns {Object} Test result object
 */
exports.getTestResult = async (userId) => {
  const testResult = await TestResult.findOne({ user: userId }).populate('user');

  if (!testResult) {
    const error = new Error('Test result not found');
    error.statusCode = 404;
    throw error;
  }

  return testResult;
};

/**
 * Get all tests for a user
 * @param {String} userId - User ID
 * @returns {Array} Array of test results
 */
exports.getUserTests = async (userId) => {
  const tests = await TestResult.find({ user: userId });
  return tests;
};