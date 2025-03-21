const testService = require('../services/testService');

/**
 * @desc    Get questions for test
 * @route   GET /api/tests/questions
 * @access  Private
 */
exports.getQuestions = async (req, res, next) => {
    try {
        // Get questions
        const questions = await testService.getQuestions(5); // Get 5 questions

        // Map questions to remove correct answer flags for client
        const mappedQuestions = questions.map(q => ({
            id: q._id,
            text: q.text,
            options: q.options.map(opt => ({
                id: opt._id,
                text: opt.text,
            })),
            pointValue: q.pointValue,
        }));

        // Send response
        res.status(200).json({
            status: 'success',
            data: {
                questions: mappedQuestions,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Submit test answers
 * @route   POST /api/tests/submit
 * @access  Private
 */
exports.submitTest = async (req, res, next) => {
    try {
        const { answers } = req.body;

        // Validate answers
        if (!answers || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide answers',
            });
        }

        // Save test result
        const testResult = await testService.saveTestResult(req.user._id, answers);

        // Send response
        res.status(201).json({
            status: 'success',
            data: {
                testResult: {
                    id: testResult._id,
                    totalScore: testResult.totalScore,
                    totalQuestions: testResult.totalQuestions,
                    completedAt: testResult.completedAt,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get test result by ID
 * @route   GET /api/tests/:id
 * @access  Private
 */
exports.getTestResult = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Get test result
        const testResult = await testService.getTestResult(id);

        // Check if test belongs to user
        if (testResult.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                status: 'error',
                message: 'Not authorized to access this test result',
            });
        }

        // Send response
        res.status(200).json({
            status: 'success',
            data: {
                testResult: {
                    id: testResult._id,
                    totalScore: testResult.totalScore,
                    totalQuestions: testResult.totalQuestions,
                    completedAt: testResult.completedAt,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all tests for user
 * @route   GET /api/tests
 * @access  Private
 */
exports.getUserTests = async (req, res, next) => {
    try {
        // Get user tests
        const tests = await testService.getUserTests(req.user._id);

        // Map test results
        const mappedTests = tests.map(test => ({
            id: test._id,
            totalScore: test.totalScore,
            totalQuestions: test.totalQuestions,
            completedAt: test.completedAt,
        }));

        // Send response
        res.status(200).json({
            status: 'success',
            data: {
                tests: mappedTests,
            },
        });
    } catch (error) {
        next(error);
    }
};