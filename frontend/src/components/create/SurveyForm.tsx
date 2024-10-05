"use client";
import { useSurveyorContext } from "@/context/SurveyorProvider";
import React, { useState } from "react";
import SurveySuccess from "./SurveySucess";

type QuestionType = {
  id: number;
  question: string;
  description: string;
};

const SurveyForm: React.FC = () => {
  const { questions, setQuestions } = useSurveyorContext();
  const [submitted, setSubmitted] = useState(false);
  // Add a new question
  const handleAddQuestion = () => {
    const newQuestion: QuestionType = {
      id: Date.now(),
      question: "",
      description: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleSurveySubmission = () => {
    // trigger something to submit survey
    setSubmitted(true);
  };

  // Remove a question by its ID
  const handleRemoveQuestion = (id: number) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  };

  // Update a question
  const handleUpdateQuestion = (id: number, field: string, value: string) => {
    const updatedQuestions = questions.map((q) => (q.id === id ? { ...q, [field]: value } : q));
    setQuestions(updatedQuestions);
  };

  if (submitted) return <SurveySuccess />;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Create Survey</h1>
      {questions.map((question) => (
        <div key={question.id} className="mb-4 p-4 border rounded-md bg-gray-50">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Question:</label>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleUpdateQuestion(question.id, "question", e.target.value)}
            placeholder="Enter your question"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mt-4 mb-2 text-sm font-semibold text-gray-700">
            Description:
          </label>
          <textarea
            value={question.description}
            onChange={(e) => handleUpdateQuestion(question.id, "description", e.target.value)}
            placeholder="Enter a description"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => handleRemoveQuestion(question.id)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Remove Question
          </button>
        </div>
      ))}

      <button
        onClick={handleAddQuestion}
        className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Add Question
      </button>
      <button
        onClick={handleSurveySubmission}
        className="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Submit Survey
      </button>
    </div>
  );
};

export default SurveyForm;
