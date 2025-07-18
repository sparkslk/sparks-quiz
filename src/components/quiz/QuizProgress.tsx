"use client";

import React from 'react';

interface QuizProgressProps {
    currentStep: number;
    totalSteps: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ currentStep, totalSteps }) => {
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full mb-8">
            {/* Step counter */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">
                    Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-gray-500">
                    {Math.round(progressPercentage)}% complete
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            {/* Progress dots for smaller screens */}
            <div className="hidden sm:flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalSteps }, (_, index) => {
                    const step = index + 1;
                    const isCompleted = step < currentStep;
                    const isCurrent = step === currentStep;

                    return (
                        <div
                            key={step}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${isCompleted
                                    ? 'bg-indigo-500'
                                    : isCurrent
                                        ? 'bg-indigo-400 scale-125'
                                        : 'bg-gray-300'
                                }`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default QuizProgress;
