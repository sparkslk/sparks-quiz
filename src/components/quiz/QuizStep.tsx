"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';
import { QuizQuestion } from '@/lib/quizData';
import { FaRegCircle, FaDotCircle } from 'react-icons/fa';
import { z } from 'zod';

interface QuizStepProps {
    question: QuizQuestion;
    validationSchema: z.ZodObject<any>;
    isLastStep: boolean;
    onNext: () => void;
    onPrevious: () => void;
}

const QuizStep: React.FC<QuizStepProps> = ({
    question,
    validationSchema,
    isLastStep,
    onNext,
    onPrevious,
}) => {
    const { currentStep, quizData, updateQuizData } = useQuizStore();

    // Get the current value from store
    const getCurrentValue = () => {
        const value = quizData[question.fieldName as keyof typeof quizData];
        if (question.inputType === 'checkbox') {
            return Array.isArray(value) ? value : [];
        }
        return value || (question.inputType === 'range' ? 5 : '');
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(validationSchema),
        mode: 'onChange',
    });

    const watchedValue = watch();

    useEffect(() => {
        // Set initial values from store
        if (question.fieldName === 'gender') {
            setValue('gender', quizData.gender || '');
            setValue('age', quizData.age || '');
        } else if (question.inputType === 'checkbox') {
            const currentValue = getCurrentValue();
            setValue('selections', currentValue);
        } else if (question.inputType === 'range') {
            const currentValue = getCurrentValue();
            setValue('rating', currentValue || 5);
        } else if (question.inputType === 'textarea') {
            const currentValue = getCurrentValue();
            setValue('expectations', currentValue);
        } else if (question.fieldName === 'commitmentLevel') {
            const currentValue = getCurrentValue();
            setValue('commitment', currentValue);
        } else {
            const currentValue = getCurrentValue();
            setValue('selection', currentValue);
        }
    }, [question.fieldName, question.inputType, setValue, quizData]);

    const onSubmit = (data: any) => {
        // Map form data to quiz data based on field type
        if (question.fieldName === 'gender') {
            // For the first question, store both gender and age
            updateQuizData('gender', data.gender);
            updateQuizData('age', data.age);
        } else if (question.inputType === 'checkbox') {
            updateQuizData(question.fieldName as any, data.selections || []);
        } else if (question.inputType === 'range') {
            updateQuizData(question.fieldName as any, data.rating);
        } else if (question.inputType === 'textarea') {
            updateQuizData(question.fieldName as any, data.expectations);
        } else if (question.fieldName === 'commitmentLevel') {
            updateQuizData(question.fieldName as any, data.commitment);
        } else {
            updateQuizData(question.fieldName as any, data.selection);
        }

        onNext();
    };

    const handleBack = () => {
        onPrevious();
    };

    const handleCheckboxChange = (optionValue: string) => {
        const currentSelections = Array.isArray(watchedValue.selections) ? watchedValue.selections : [];
        let newSelections: string[];

        if (currentSelections.includes(optionValue)) {
            newSelections = currentSelections.filter((val: string) => val !== optionValue);
        } else {
            newSelections = [...currentSelections, optionValue];
        }

        setValue('selections', newSelections);
        updateQuizData(question.fieldName as any, newSelections);
    };

    const renderAgeInput = () => (
        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
            </label>
            <input
                type="number"
                {...register('age', { valueAsNumber: true })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your age"
                min="13"
                max="120"
            />
            {errors.age && (
                <p className="text-red-500 text-sm mt-1">{String(errors.age?.message)}</p>
            )}
        </div>
    );

    const renderInput = () => {
        switch (question.inputType) {
            case 'radio':
                return (
                    <div className="space-y-4">
                        {question.options?.map((option) => (
                            <label
                                key={option.value}
                                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200
                  ${watchedValue.gender === option.value || watchedValue.selection === option.value || watchedValue.commitment === option.value
                                        ? 'bg-indigo-500 text-white border-indigo-600 shadow-md'
                                        : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100 hover:border-gray-300'}`}
                            >
                                <input
                                    type="radio"
                                    {...register(question.fieldName === 'gender' ? 'gender' : question.fieldName === 'commitmentLevel' ? 'commitment' : 'selection')}
                                    value={option.value}
                                    className="hidden"
                                />
                                {option.icon && (
                                    <option.icon className="mr-4 text-2xl" />
                                )}
                                <span className="font-medium">{option.label}</span>
                            </label>
                        ))}
                        {question.fieldName === 'gender' && renderAgeInput()}
                    </div>
                );

            case 'checkbox':
                return (
                    <div className="space-y-4">
                        {question.options?.map((option) => (
                            <label
                                key={option.value}
                                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200
                  ${Array.isArray(watchedValue.selections) && watchedValue.selections.includes(option.value)
                                        ? 'bg-indigo-500 text-white border-indigo-600 shadow-md'
                                        : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100 hover:border-gray-300'}`}
                            >
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    className="hidden"
                                    onChange={() => handleCheckboxChange(option.value)}
                                    checked={Array.isArray(watchedValue.selections) && watchedValue.selections.includes(option.value)}
                                />
                                <span className="relative mr-4 w-6 h-6 flex items-center justify-center">
                                    {Array.isArray(watchedValue.selections) && watchedValue.selections.includes(option.value) ? (
                                        <FaDotCircle className="text-white text-lg" />
                                    ) : (
                                        <FaRegCircle className="text-gray-400 text-lg" />
                                    )}
                                </span>
                                {option.icon && (
                                    <option.icon className="mr-4 text-2xl" />
                                )}
                                <span className="font-medium">{option.label}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'range':
                return (
                    <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>1 - Very Low</span>
                            <span>10 - Very High</span>
                        </div>
                        <input
                            type="range"
                            {...register('rating', { valueAsNumber: true })}
                            min="1"
                            max="10"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((Number(watchedValue.rating) || 5) - 1) * 11.11}%, #e5e7eb ${((Number(watchedValue.rating) || 5) - 1) * 11.11}%, #e5e7eb 100%)`
                            }}
                        />
                        <div className="text-center mt-4">
                            <span className="text-2xl font-bold text-indigo-600">
                                {Number(watchedValue.rating) || 5}
                            </span>
                        </div>
                    </div>
                );

            case 'textarea':
                return (
                    <div>
                        <textarea
                            {...register('expectations')}
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-32"
                            rows={4}
                            placeholder="Share your thoughts and goals..."
                        />
                        {errors.expectations && (
                            <p className="text-red-500 text-sm mt-1">{String(errors.expectations?.message)}</p>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl mx-auto"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {question.question}
                        </h2>
                        {question.description && (
                            <p className="text-lg text-gray-600">
                                {question.description}
                            </p>
                        )}
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        {renderInput()}
                    </div>

                    <div className="flex justify-between pt-6">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 font-medium"
                            >
                                Previous
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium ml-auto"
                        >
                            {isLastStep ? 'Complete Quiz' : 'Next'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </AnimatePresence>
    );
};

export default QuizStep;
