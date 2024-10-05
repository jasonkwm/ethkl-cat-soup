"use client";

import { useSurveyorContext } from "@/context/SurveyorProvider";
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

const Dashboard = () => {
  const { surveyList } = useSurveyorContext();
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
