import React, { useState, useEffect } from 'react';
import Header from "../layouts/header";
import API from '../services/api';
import toast from 'react-hot-toast';

const Questions = () => {
    // State for questions data
    const [questions, setQuestions] = useState([]);

    // States for UI control
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [allAnswered, setAllAnswered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check if all questions are answered
    useEffect(() => {
        if (questions.length > 0) {
            const answered = questions.every(q => q.selectedOption !== null);
            setAllAnswered(answered);
        }
    }, [questions]);

    // getAllQuestions from backend
    useEffect(() => {
        getAllQuestions();
    }, []);

    const getAllQuestions = async () => {
        try {
            const response = await API.get("/tests/questions");
            if (response.status === 200) {
                console.log(response.data.data.questions);
                // Map the questions to include selectedOption property if not already there
                const mappedQuestions = response.data.data.questions.map((q) => ({
                    ...q,
                    id: q.id,
                    selectedOption: q.selectedOption || null
                }));
                setQuestions(mappedQuestions);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching questions:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to fetch questions.");
            setIsLoading(false);
        }
    };

    // Handle option selection
    const handleOptionSelect = (questionId, optionIndex) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                // Store both the index for UI and the option ID for submission
                return {
                    ...q,
                    selectedOption: optionIndex,
                    selectedOptionId: q.options[optionIndex].id // Store the actual option ID
                };
            }
            return q;
        }));
    };

    // Navigation handlers
    const goToQuestion = (num) => {
        if (num >= 1 && num <= questions.length) {
            setCurrentQuestion(num);
        }
    };

    const goToPrevious = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const goToNext = () => {
        if (currentQuestion < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // Submit handler
    const handleSubmit = async () => {
        if (allAnswered) {
            try {
                // Format the data as required by your backend
                const formattedAnswers = questions.map(q => ({
                    questionId: q.id,
                    selectedOptionId: q.selectedOptionId // Use the stored option ID
                }));
                console.log(questions)
                // Send answers to backend
                const response = await API.post("/tests/submit", { answers: formattedAnswers });

                if (response.status === 200) {
                    toast.success("Quiz submitted successfully!");
                    // You might want to redirect or show results here
                }
            } catch (error) {
                console.error("Submit error:", error.response?.data || error.message);
                toast.error(error.response?.data?.message || "Failed to submit answers.");
            }
        } else {
            toast.error("Please answer all questions before submitting.");
        }
    };

    // Get current question object
    const question = questions.length > 0 && currentQuestion <= questions.length
        ? questions.find(q => q.id === currentQuestion) || questions[currentQuestion - 1]
        : null;

    return (
        <>
            {!isLoading ? (
                <div className="flex flex-col min-h-screen overflow-hidden text-black">
                    <Header />
                    <div className="text-center">
                        <p className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                            Assess Your {" "}
                            <span className="relative">
                                Intelligence
                                <div className="absolute bottom-0 left-0 right-0 h-2 sm:h-3 bg-yellow-300 -z-10"></div>
                            </span>
                        </p>
                    </div>

                    <div className="flex justify-center mt-16">
                        <div className="flex h-screen bg-gray-100 w-full">
                            {/* Sidebar */}
                            {sidebarVisible && (
                                <div className="w-40 bg-white shadow-md p-4 flex flex-col">
                                    <div className="grid grid-cols-3 gap-2">
                                        {questions.map((q, index) => (
                                            <button
                                                key={q._id || q.id || index}
                                                className={`p-2 border rounded-md ${currentQuestion === q.id
                                                    ? 'bg-blue-700 text-white'
                                                    : q.selectedOption !== null
                                                        ? 'bg-gray-300'
                                                        : 'bg-white'
                                                    }`}
                                                onClick={() => goToQuestion(q.id)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-16 flex flex-col space-y-2">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <span className="text-sm">Attempted</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-white border border-gray-300 rounded-full mr-2"></div>
                                            <span className="text-sm">Not Attempted</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                                            <span className="text-sm">Yet to Attend</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Main Content */}
                            {question && (
                                <div className="flex-1 flex flex-col">
                                    {/* Header with sidebar toggle */}
                                    <div className="p-4 border-b flex justify-between items-center">
                                        <button
                                            onClick={() => setSidebarVisible(!sidebarVisible)}
                                            className="p-2 rounded-md hover:bg-gray-100"
                                        >
                                            {sidebarVisible ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                                </svg>
                                            )}
                                        </button>
                                        <div className="text-right">
                                            {currentQuestion}/{questions.length}
                                        </div>
                                    </div>

                                    {/* Question Area */}
                                    <div className="flex-1 p-4 overflow-auto">
                                        <div className="bg-white shadow-md rounded-md p-6 max-w-3xl mx-auto">
                                            <div className="flex items-center mb-6">
                                                <div className="bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                                    {currentQuestion}
                                                </div>
                                                <div className="text-lg font-medium">{question.text}</div>
                                            </div>

                                            <div className="space-y-3">
                                                {question.options.map((option, index) => (
                                                    <div
                                                        key={option._id || index}
                                                        className={`p-3 rounded-md border flex items-center cursor-pointer
                                                        ${question.selectedOption === index ? 'bg-green-100 border-green-300' : 'bg-gray-50 hover:bg-gray-100'}`}
                                                        onClick={() => handleOptionSelect(question.id, index)}
                                                    >
                                                        <input
                                                            type="radio"
                                                            className="form-radio h-4 w-4 text-blue-600"
                                                            checked={question.selectedOption === index}
                                                            onChange={() => handleOptionSelect(question.id, index)}
                                                        />
                                                        <label className="ml-2">{option.text}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Navigation and Submit Footer */}
                                    <div className="p-4 border-t flex justify-between">
                                        <button
                                            onClick={goToPrevious}
                                            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center"
                                            disabled={currentQuestion === 1}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Previous
                                        </button>

                                        <div>
                                            {currentQuestion === questions.length && (
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={!allAnswered}
                                                    className={`px-4 py-2 rounded-md mr-2 ${allAnswered
                                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        }`}
                                                >
                                                    Submit
                                                </button>
                                            )}

                                            {currentQuestion < questions.length && (
                                                <button
                                                    onClick={goToNext}
                                                    className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center"
                                                >
                                                    Next
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="ml-3">Loading questions...</p>
                </div>
            )}
        </>
    );
};

export default Questions;