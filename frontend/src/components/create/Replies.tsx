"use client";

import { useState, useEffect } from "react";
import Image from "next/image.js";
import { useWeb3AuthContext } from "@/context/Web3AuthProvider";
import CryptoSurvey from "@/contract/CryptoSurvey";
import {Web3} from "web3";

import axios from 'axios';

// import { useQueryClient } from '@tanstack/react-query';




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
  const {web3AuthProvider, web3Auth, getAccounts} = useWeb3AuthContext();
  

  const web3 = new Web3(web3AuthProvider as any);

  const contractAddress = CryptoSurvey.address;
  const contractAbi = CryptoSurvey.abi; // Your contract ABI
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  useEffect(()=>{
    console.log("running use effect")
    
    const url = 'https://api.studio.thegraph.com/query/90761/cryptosurveyv1/version/latest'
    const query = `{
      surveys(first: 5) {
        id
        surveyId
        name
        description
      }
      requests(first: 5) {
        id
        survey {
          id
        }
        requestAddress
        description
      }
    }`;
  const fetchData = async () => {
    try {
      const response = await axios.post(
        'https://api.studio.thegraph.com/query/90761/cryptosurveyv1/version/latest',
        {
          query: query,
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
  
  


  

  

    
      
    // })
    // const useSurveysQuery = (owner: any) => {
    //   return useQuery({
    //     queryKey: ['data', owner],
    //     queryFn: async () => {
    //       return await request(url, query, { owner });
    //     },
    //     enabled: !!owner, // only fetch when owner is available
    //   });
    // }

  return (
    <div className="m-auto w-[92%] p-6 bg-white rounded-lg shadow-lg mt-4">
      <p className="font-semibold">{survey.name}</p>
      <p className="text-gray-600">{survey.description}</p>
      <div className="mx-auto">
        <p className="font-semibold mb-6">Survey Questions</p>
        <ul style={{paddingLeft: "0px"}}>
          {surveyData.map((item, index) => (
            <li key={index} className="p-4 bg-white rounded-lg shadow-md border border-gray-200" style={{marginBottom: "15px"}}>
			  <div className="flex">
				  <Image src="/letter-q.png" width={500} height={500} alt="letter-q" style={{ width: "25px", height: "25px", marginRight: "10px" }}></Image>
	              <p className="font-semibold">{item.question}</p>
			  </div>
			  <div className="flex">
				  <Image src="/a.png" width={500} height={500} alt="letter-a" style={{ width: "25px", height: "25px", marginRight: "10px" }}></Image>
	              <p className="font-semibold">Responses:</p>
			  </div>
              <ul className="list-none pl-5">
                {item.answers.map((response, userIndex) => (
                  <li key={userIndex} className="text-gray-800">
					<div className="flex">
						<Image src="/user.png" width={500} height={500} alt="letter-a" style={{ width: "28px", height: "28px", marginRight: "10px", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px 5px" }}></Image>
	                    <strong>{response.user}</strong>: {response.answer}
					</div>
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
