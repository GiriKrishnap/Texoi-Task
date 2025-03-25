import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Header from '../layouts/header';
import { emojiIcons } from '../utils/emojiIcons';
import toast from 'react-hot-toast';


const TestResultFeedback = () => {
    const [testResult, setTestResult] = useState(null);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [testId, setTestId] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch test result on component mount
    useEffect(() => {
        checkCompleted()
        fetchTestResult();
    }, []);


    const checkCompleted = async () => {
        const response = await API.get("/auth/completed");
        if (!response.data.completed) {
            toast.success('Complete the test first')
            navigate('/questions')
        }
    }

    const fetchTestResult = async () => {
        try {
            const response = await API.get("/questions/get-result")
            setTestResult(response.data.data.testResult);
            setTestId(response.data.data.testResult.id);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching test result');
            navigate('/');
        }
    };


    const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji);
    };

    const handleSubmitFeedback = async () => {
        if (!selectedEmoji) {
            setError('Please select an emoji for feedback');
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            await API.post('/feedback/submit', {
                testId,
                emoji: selectedEmoji,
                comment
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Redirect to home after successful submission
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting feedback');
        } finally {
            setIsSubmitting(false);
        }
    };

    const goToHome = () => {
        navigate('/');
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="text-red-500 mb-4">{error}</div>
                <button
                    onClick={goToHome}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md"
                >
                    Go to Home
                </button>
            </div>
        );
    }

    if (!testResult) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-black">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden px-10">
                    {/* Success Icon */}
                    <div className="flex justify-center mt-6">
                        <div className="bg-teal-500 rounded-full p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="text-center mt-4">
                        <h2 className="text-lg font-medium">Congratulations you have Successfully Completed The Test</h2>
                        <div className="mt-2">
                            <p className="inline">Score : </p>
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded font-medium">
                                {testResult.totalScore}/{testResult.totalQuestions * 5}
                            </span>
                        </div>

                        {/* User ID */}
                        <div className="mt-4 mb-6">
                            <div className="inline-block bg-blue-700 text-white px-4 py-2 rounded">
                                Your ID : {testResult.id.substring(testResult.id.length - 6)}
                            </div>
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="bg-gray-50 p-6">
                        <div className="mb-4">
                            <h3 className="font-bold text-lg">Feedback</h3>
                            <p className="text-sm text-gray-600">Give us a feedback!</p>
                            <p className="text-sm text-gray-600">Your input is important to us. We take customer feedback very seriously.</p>
                        </div>

                        {/* Emoji Selection */}
                        <div className="flex gap-7 mb-4">
                            {Object.entries(emojiIcons).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => handleEmojiSelect(key)}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl 
                  ${selectedEmoji === key
                                            ? 'bg-gray-300 border-2 border-gray-400'
                                            : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>

                        {/* Comment Box */}
                        <div className="mb-4">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment"
                                className="w-full p-2 border border-gray-300 rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmitFeedback}
                            disabled={isSubmitting}
                            className="w-full bg-blue-700 text-white py-2 rounded font-medium hover:bg-blue-800 transition-colors"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default TestResultFeedback;