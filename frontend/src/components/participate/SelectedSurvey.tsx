"use client";
import { useParticipantContext } from "@/context/ParticipantProvider";
import React, { useState } from "react";

type Question = {
  id: number;
  question: string;
};

type SelectedSurveyProps = {
  surveyName: string;
  questions: Question[];
  onSubmit: (answers: { [key: number]: string }) => void;
};

const surveyData = [
  {
    question: "What is your favorite way to spend a weekend?",
    id: 1,
  },
  {
    question: "How do you usually commute to work?",
    id: 2,
  },
  {
    question: "What kind of music do you enjoy?",
    id: 3,
  },
  {
    question: "What is your favorite movie of all time?",
    id: 4,
  },
  {
    id: 5,
    question: "What hobby would you like to pick up?",
  },
];

const SelectedSurvey: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const { selectedSurvey, setSelectedSurvey } = useParticipantContext();
  const [questions, setQuestions] = useState<any>(surveyData);
  if (!selectedSurvey) return;
  const handleInputChange = (id: number, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(answers);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-4xl">
      <button
        onClick={() => setSelectedSurvey(null)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{selectedSurvey.name}</h1>
      <p>{selectedSurvey.description}</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q: any) => (
          <div key={q.id} className="p-4 border rounded-md bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{q.question}</h2>
            <input
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              placeholder="Type your answer here..."
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
};

export default SelectedSurvey;
