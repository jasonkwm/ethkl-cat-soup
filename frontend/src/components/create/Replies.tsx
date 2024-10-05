"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import Image from "next/image.js";
import { useWeb3AuthContext } from "@/context/Web3AuthProvider";
import CryptoSurvey from "@/contract/CryptoSurvey";
import { Web3 } from "web3";
import { downloadIPFS } from "@/utilities/downloadIPFS"
import { useSurveyorContext } from '@/context/SurveyorProvider';

// import { useQueryClient } from '@tanstack/react-query';
type SurveyResponseType = {
	encryptedCID: string;
	SurveyReply: {
		encryptedCID: string;
		replyAddress: string;
	}[];
};

type SurveyDataType = {
	data: {
		surveys: SurveyResponseType[];
	}
};

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
type SurveyQnAType = {
	question: string;
	answers: {
		user: string;
		answer: string;
	}[];
};

export default function Replies() {
	const [survey, setSurvey] = useState<SurveyDataType | null>(null);
	// const [surveyQnA, setSurveyQnA,] = useSurveyorContext();
	const [surveyQnA, setSurveyQnA,] = useState<SurveyQnAType[]>([]);
	const { web3AuthProvider, web3Auth, publicKey, web3Rpc } = useWeb3AuthContext();
	const params = useParams()
	const { surveyId } = params;

	const web3 = new Web3(web3AuthProvider as any);

	const contractAddress = CryptoSurvey.address;
	const contractAbi = CryptoSurvey.abi; // Your contract ABI
	const contract = new web3.eth.Contract(contractAbi, contractAddress);

	useEffect(() => {
		const url = "https://api.studio.thegraph.com/query/90761/cryptosurveyv1/version/latest";

		const fetchData = async () => {
			try {
				const query = `{
          surveys(where: {surveyId:"${surveyId}"}) {
				 	encryptedCID
					SurveyReply{
						encryptedCID
						replyAddress
					}
				}
				}`;
				// console.log(owner)

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

				const data = await response.json();
				setSurvey(data);
				console.log(data)

				console.log("response data is : ", data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		if (!survey || !Array.isArray(survey) || survey.length === 0) {
			fetchData();
		}
	}, [publicKey, survey]);

	useEffect(() => {
		if (survey && survey.data && Array.isArray(survey.data.surveys)) {
			console.log("survey.data.surveys:", survey.data.surveys);

			// Loop through each survey in the surveys array
			survey.data.surveys.forEach((surveyItem) => {
				if (surveyItem.encryptedCID) {
					// Call downloadIPFS with the encryptedCID for each survey item
					let response_data = downloadIPFS(surveyItem.encryptedCID);
				} else {
					console.error("No encryptedCID found for survey item", surveyItem);
				}
			});
		}

	}, [survey])

	return (
		<div className="m-auto w-[92%] p-6 bg-white rounded-lg shadow-lg mt-4">
			<p className="font-semibold">Survey Name</p>
			<p className="text-gray-600">Survey description goes here.</p>

			<div className="mx-auto">
				<p className="font-semibold mb-6">Survey Questions</p>

				<ul style={{ paddingLeft: "0px" }}>
					{surveyQnA?.length ? (
						surveyQnA.map((item, index) => (
							<li
								key={index}
								className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
								style={{ marginBottom: "15px" }}
							>
								{/* Question */}
								<div className="flex">
									<Image
										src="/letter-q.png"
										width={500}
										height={500}
										alt="letter-q"
										style={{ width: "25px", height: "25px", marginRight: "10px" }}
									/>
									<p className="font-semibold">{item.question}</p>
								</div>

								{/* Answers */}
								<div className="flex">
									<Image
										src="/a.png"
										width={500}
										height={500}
										alt="letter-a"
										style={{ width: "25px", height: "25px", marginRight: "10px" }}
									/>
									<p className="font-semibold">Responses:</p>
								</div>

								{/* Responses */}
								<ul className="list-none pl-5">
									{item.answers.map((response, userIndex) => (
										<li key={userIndex} className="text-gray-800">
											<div className="flex">
												<Image
													src="/user.png"
													width={500}
													height={500}
													alt="user-icon"
													style={{
														width: "28px",
														height: "28px",
														marginRight: "10px",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														padding: "5px 5px",
													}}
												/>
												<strong>{response.user}</strong>: {response.answer}
											</div>
										</li>
									))}
								</ul>
							</li>
						))
					) : (
						<p>No survey data available.</p>
					)}
				</ul>
			</div>
		</div>
	);
}

