"use client";
import { useSurveyorContext } from "@/context/SurveyorProvider";
import React, { useState } from "react";
import SurveySuccess from "./SurveySucess";
import Image from "next/image.js";
import { useWeb3AuthContext } from "@/context/Web3AuthProvider";

type QuestionType = {
  id: number;
  question: string;
  description: string;
};

const SurveyForm: React.FC = () => {
  const { questions, setQuestions } = useSurveyorContext();
  const {} = useWeb3AuthContext();
  const [surveyDetails, setSurveyDetails] = useState<any>({
    title: "",
    description: "",
    incentive: "",
    maxReply: "",
  });
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

  const handleUpdateSurvey = (key: string, value: string) => {
    setSurveyDetails((prevDetails: any) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  if (submitted) return <SurveySuccess />;

  return (
    <div>
      <h4 className="text-left">Create Survey</h4>
      <p className="italic">Create surveys by adding as many questions as you like</p>
      <div className="mb-4 p-4 border rounded-md bg-gray-50">
        {/* Title Field */}
        <label className="block mb-2 text-sm font-semibold text-gray-700">Title:</label>
        <input
          type="text"
          value={surveyDetails["title"]}
          onChange={(e) => handleUpdateSurvey("title", e.target.value)}
          placeholder="Enter the survey title"
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {/* Description Field */}
        <label className="block mt-4 mb-2 text-sm font-semibold text-gray-700">Description:</label>
        <textarea
          value={surveyDetails["description"]}
          onChange={(e) => handleUpdateSurvey("description", e.target.value)}
          placeholder="Enter a description"
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {/* Incentive Field */}
        <label className="block mt-4 mb-2 text-sm font-semibold text-gray-700">Incentive:</label>
        <input
          type="number"
          value={surveyDetails["incentive"]}
          onChange={(e) => handleUpdateSurvey("incentive", e.target.value)}
          placeholder="Enter the incentive"
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {/* Number of Users Field */}
        <label className="block mt-4 mb-2 text-sm font-semibold text-gray-700">
          Maximum Number of Replies:
        </label>
        <input
          type="number"
          value={surveyDetails["maxReply"]}
          onChange={(e) => handleUpdateSurvey("maxReply", e.target.value)}
          placeholder="Enter number of users"
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
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
            className="mt-4 px-4 py-2 bg-custom-dark-brown rounded-md hover:bg-custom-light-brown transition"
          >
            <Image
              src="/trash.png"
              width={500}
              height={500}
              alt="trash"
              style={{ width: "25px", height: "25px" }}
            ></Image>
          </button>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          onClick={handleAddQuestion}
          className="mt-6 px-4 py-2 bg-custom-dark-brown rounded-md hover:bg-custom-light-brown transition"
        >
          <Image
            src="/add.png"
            width={500}
            height={500}
            alt="add"
            style={{ width: "25px", height: "25px" }}
          ></Image>
        </button>
        <button
          onClick={handleSurveySubmission}
          className="mt-6 px-4 py-2 bg-custom-dark-brown rounded-md hover:bg-custom-light-brown transition"
          style={{ marginLeft: "10px" }}
        >
          <Image
            src="/upload.png"
            width={500}
            height={500}
            alt="add"
            style={{ width: "25px", height: "25px" }}
          ></Image>
        </button>
      </div>
    </div>
  );
};

export default SurveyForm;
