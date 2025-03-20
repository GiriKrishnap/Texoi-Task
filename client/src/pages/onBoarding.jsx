import React, { useState } from 'react';
import Header from '../layouts/header';
import { useNavigate } from 'react-router-dom';

function OnBoarding() {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            {/* Header */}
            <Header />

            {/* Main content - centered vertically and horizontally */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
                <div className='text-center'>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                        Welcome to
                        <span className="relative inline-block mx-1">
                            {" TSEEP Mastery Box"}
                            <div className="absolute bottom-1 left-0 right-0 h-2 sm:h-3 bg-yellow-300 -z-10"></div>
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                        Unlock your potential with <span className='font-semibold'>AI inspired tool</span>
                    </p>
                </div>
            </div>

            <hr className="w-full" />

            {/* Footer section with checkbox and button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 md:p-10 lg:p-14 gap-4 sm:gap-6">
                <div className="flex items-start max-w-xs sm:max-w-sm md:max-w-md">
                    <input
                        type="checkbox"
                        id="consent"
                        className="mt-1 h-4 w-4"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="consent" className="ml-2 text-xs sm:text-sm text-gray-700">
                        I confirm that I have read and accept the terms and conditions and privacy policy.
                    </label>
                </div>
                <button
                    className={`button-style text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!isChecked}
                    onClick={() => navigate('/login')}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default OnBoarding;