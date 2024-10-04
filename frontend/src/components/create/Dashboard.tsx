"use client";

import Link from "next/link";
import { useState } from "react";

// Button (View)
// - Reply
// - Requests

type SurveyDetailsType = {
  pollId: number;
  name: string;
  description: string;
  image: string;
  // number of responses allowed
  marketReply: number;
  // in eth
  incentive: number;
};

const dummySurvey: SurveyDetailsType[] = [
  {
    pollId: 1,
    name: "Customer Satisfaction Survey",
    description: "tomato lorem something something a very long description",
    image: "",
    marketReply: 300,
    incentive: 2,
  },
  {
    pollId: 2,
    name: "Employee Feedback Survey",
    description: "tomato lorem something something a very long description",
    image: "",
    marketReply: 100,
    incentive: 3,
  },
  {
    pollId: 3,
    name: "Product Research Survey",
    description: "tomato lorem something something a very long description",
    image: "",
    marketReply: 700,
    incentive: 1,
  },
];

const Dashboard = () => {
  const [surveyList, setSurveyList] = useState<SurveyDetailsType[]>(dummySurvey);
  return (
    <div className="space-y-4">
      {surveyList.map((survey: SurveyDetailsType) => (
        <div
          key={survey.pollId}
          className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md"
        >
          <span className="font-semibold text-lg">{survey.name}</span>
          <div className="flex flex-row gap-2">
            <Link
              href={"/create/view"}
              className="px-4 py-2 bg-custom-dark-brown text-white rounded-lg hover:bg-custom-dark-brown transition-colors text-white no-underline"
            >
              <img src="/eye.png" alt="crypto task" style={{ width: "25px"}}></img>
            </Link>
            <button
              className="px-4 py-2 bg-custom-dark-brown text-white rounded-lg hover:bg-custom-dark-brown transition-colors"
              onClick={() => {
                return;
              }}
            >
              <img src="/bell.png" alt="crypto task" style={{ width: "25px"}}></img>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
