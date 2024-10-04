"use client";

import { useState } from "react";

const surveyData = [
  {
    question: "What is your favorite way to spend a weekend?",
    answers: [
      { user: "Alice Johnson", answer: "Hiking in the mountains" },
      { user: "Bob Smith", answer: "Reading a book" },
      { user: "Catherine Lee", answer: "Spending time with family" },
    ],
  },
  {
    question: "How do you usually commute to work?",
    answers: [
      { user: "David Brown", answer: "By car" },
      { user: "Emily Davis", answer: "Public transport" },
      { user: "Frank Wilson", answer: "Cycling" },
      { user: "Grace Moore", answer: "Walking" },
    ],
  },
  {
    question: "What kind of music do you enjoy?",
    answers: [
      { user: "Henry Taylor", answer: "Jazz" },
      { user: "Isabella Martinez", answer: "Pop" },
      { user: "Jack Anderson", answer: "Classical" },
      { user: "Alice Johnson", answer: "Rock" },
    ],
  },
  {
    question: "What is your favorite movie of all time?",
    answers: [
      { user: "Bob Smith", answer: "Inception" },
      { user: "Catherine Lee", answer: "The Godfather" },
      { user: "Emily Davis", answer: "Forrest Gump" },
    ],
  },
  {
    question: "What hobby would you like to pick up?",
    answers: [
      { user: "David Brown", answer: "Photography" },
      { user: "Grace Moore", answer: "Gardening" },
      { user: "Frank Wilson", answer: "Cooking" },
      { user: "Henry Taylor", answer: "Playing the guitar" },
    ],
  },
];

export default function Replies() {
  const [survey, setSurvey] = useState({
    pollId: 1,
    name: "Customer Satisfaction Survey",
    description:
      "Your chance to share feedback about your experience with a product or service. Your responses help improve quality and ensure your needs are better met in the future. Your input is valuable and greatly appreciated!",
    image: "",
    marketReply: 300,
    incentive: 2,
  });
  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-lg mt-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{survey.name}</h1>
      <p className="text-lg text-gray-600">{survey.description}</p>
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Survey Questions</h1>
        <ul className="space-y-4">
          {surveyData.map((item, index) => (
            <li key={index} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold">{item.question}</h2>
              <p className="text-gray-600">Responses:</p>
              <ul className="list-disc pl-5">
                {item.answers.map((response, userIndex) => (
                  <li key={userIndex} className="text-gray-800">
                    <strong>{response.user}</strong>: {response.answer}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
