"use client";
import { useParticipantContext } from "@/context/ParticipantProvider";
import { downloadIPFS } from "@/utilities/downloadIPFS";
import React, { useState, useEffect } from "react";
import Image from "next/image.js";

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
  const [questions, setQuestions] = useState<any>();
  if (!selectedSurvey) return;
  const handleInputChange = (id: number, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
    try {
      let result = await downloadIPFS(selectedSurvey.encryptedCID)
      setQuestions(result)
      console.log(result)

    }
    catch(e) {
      console.log(e.message)
    }
  }
  if (!questions) 
    fetchData()
  },[questions])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(answers);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-4xl">
      <button
        onClick={() => setSelectedSurvey(null)}
        className="px-4 py-2 mb-8 bg-custom-dark-brown rounded-md hover:bg-custom-light-brown transition"
      >
         <Image src="/arrow.png" width={500} height={500} alt="arrow" style={{ width: "25px", height: "25px" }}></Image>
      </button>
      <p className="font-semibold" style={{marginBottom: "0px"}}>{selectedSurvey.name}</p>
      <p>{selectedSurvey.description}</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q: any) => (
          <div key={q.id}>
            <p className="font-semibold text-gray-600 mb-2">{q.question}</p>
            <input
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              placeholder="typing..."
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-custom-dark-brown rounded-md hover:bg-custom-light-brown transition"
        >
          <Image src="/upload.png" width={500} height={500} alt="upload" style={{ width: "25px", height: "25px" }}></Image>
        </button>
      </form>
    </div>
  );
};

export default SelectedSurvey;
