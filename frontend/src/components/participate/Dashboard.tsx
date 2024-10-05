"use client";

import { useParticipantContext } from "@/context/ParticipantProvider";
import { useSurveyorContext } from "@/context/SurveyorProvider";
import Link from "next/link";

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
  const { surveyList, setSelectedSurvey } = useParticipantContext();
  return (
    <div>
      <h4 className="text-left">Dashboard</h4>
      <p className="italic">A dashboard to organize and present all your created surveys</p>
      <div className="space-y-4">
        {surveyList.map((survey: SurveyDetailsType) => (
          <div
            key={survey.pollId}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md "
          >
            {/* <img src={survey.image} alt="survey" style={{ width: "25px"}}></img> */}
            <div>
              <div className="flex">
                <img src="browser.png" alt="browser" style={{ width: "25px" }}></img>
                <span className="ptext-lg" style={{ paddingLeft: "10px" }}>
                  {survey.name}
                </span>
              </div>
              <div className="flex">
                <img
                  src="information.png"
                  alt="information"
                  style={{ width: "25px", height: "25px" }}
                ></img>
                <p style={{ paddingLeft: "10px" }}>{survey.description}</p>
              </div>
            </div>
            <div>
              <img src="email.png" alt="email" style={{ width: "25px", height: "25px" }}></img>
              <p className="text-center">{survey.marketReply}</p>
            </div>
            <div>
              <img src="dollar.png" alt="dollar" style={{ width: "25px", height: "25px" }}></img>
              <p className="text-center">{survey.incentive}</p>
            </div>
            <div className="flex flex-row gap-2">
              <button
                onClick={() => setSelectedSurvey(survey)}
                className="px-4 py-2 bg-custom-dark-brown text-white rounded-lg hover:bg-custom-light-brown transition-colors text-white no-underline"
              >
                <img src="/eye.png" alt="eye" style={{ width: "25px" }}></img>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;