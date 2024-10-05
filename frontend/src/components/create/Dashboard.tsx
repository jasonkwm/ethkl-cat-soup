"use client";

import { useSurveyorContext } from "@/context/SurveyorProvider";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useWeb3AuthContext } from "@/context/Web3AuthProvider";
import CryptoSurvey from "@/contract/CryptoSurvey";
import {Web3} from "web3";

import axios from 'axios';

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
  const { surveyList, setToggleReplies } = useSurveyorContext();
  console.log(surveyList);
  const {web3AuthProvider, web3Auth, publicKey, web3Rpc} = useWeb3AuthContext();

  const web3 = new Web3(web3AuthProvider as any);

  const contractAddress = CryptoSurvey.address;
  const contractAbi = CryptoSurvey.abi; // Your contract ABI
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  
  useEffect(()=>{
    
    const url = 'https://api.studio.thegraph.com/query/90761/cryptosurveyv1/version/latest'
    
    const fetchData = async () => {
      try {
        const query = `{
          surveys(where: {owner:"${publicKey}"}) {
            id
            surveyId
            name
            description
          }
        }`;
      // console.log(owner)

      const response = await axios.post(
        'https://api.studio.thegraph.com/query/90761/cryptosurveyv1/version/latest',
        {
          query: query as string,
          operationName: "Subgraphs",
          variables: {}
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log("response data is : ", response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
  });

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
              <img
                src="email.png"
                alt="email"
                style={{ width: "25px", height: "25px" }}
              ></img>
              <p className="text-center">{survey.marketReply}</p>
            </div>
            <div>
              <img
                src="dollar.png"
                alt="dollar"
                style={{ width: "25px", height: "25px" }}
              ></img>
              <p className="text-center">{survey.incentive}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Link
                href={"/surveyor/view"}
                onClick={() => setToggleReplies(true)}
                className="px-4 py-2 bg-custom-dark-brown text-white rounded-lg hover:bg-custom-light-brown transition-colors text-white no-underline"
              >
                <img src="/eye.png" alt="eye" style={{ width: "25px" }}></img>
              </Link>
              <Link
                href={"/surveyor/view"}
                className="px-4 py-2 bg-custom-dark-brown text-white rounded-lg hover:bg-custom-light-brown transition-colors"
                onClick={() => setToggleReplies(false)}
              >
                <img src="/bell.png" alt="bell" style={{ width: "25px" }}></img>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
