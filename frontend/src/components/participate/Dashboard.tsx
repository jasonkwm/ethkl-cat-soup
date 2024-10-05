"use client";

import { useParticipantContext } from "@/context/ParticipantProvider";
import { useSurveyorContext } from "@/context/SurveyorProvider";
import { useEffect } from "react";
import { useWeb3AuthContext } from "@/context/Web3AuthProvider";
import Link from "next/link";
import { Web3 } from "web3";

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
  const { web3AuthProvider, web3Auth, publicKey, web3Rpc } = useWeb3AuthContext();
  const { surveyList, setSurveyList, selectedSurvey, setSelectedSurvey } = useParticipantContext();


  useEffect(() => {
    const url = "https://api.studio.thegraph.com/query/90761/cryptosurveyv1/version/latest";

    const fetchData = async () => {
      try {
        const query = `{
          surveys(where: {owner_not:"${publicKey}"}) {
            surveyId
            name
            description
            maxReply
            incentive
            encryptedCID
            owner
            SurveyReply {
              encryptedCID

            }
          }
        }`;


        const response = await fetch(
          "https://api.studio.thegraph.com/query/90761/cryptosurveyv1/version/latest",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: query as string,
              operationName: "Subgraphs",
              variables: {},
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSurveyList(data.data.surveys);
        console.log("response data is : ", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (surveyList.length === 0) {
      fetchData();
    }
  }, [publicKey, surveyList]);


  return (
    <div>
      <h4 className="text-left">Dashboard</h4>
      <p className="italic">A dashboard to look for and participate in surveys</p>
      <div className="space-y-4">
        {surveyList.length === 0 ? (
          <p>No surveys found.</p>
        ): surveyList.map((survey: SurveyDetailsType) => (
          <div
            key={survey.surveyId}
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
              <p className="text-center">{survey.maxReply}</p>
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
