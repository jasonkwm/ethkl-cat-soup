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

	// const [surveyQnA, setSurveyQnA,] = useSurveyorContext();
	const [surveyQnA, setSurveyQnA,] = useState<SurveyQnAType[]>([]);
  const { surveyList, setSurveyList, setToggleReplies } = useSurveyorContext();
	const { web3AuthProvider, web3Auth, publicKey, web3Rpc } = useWeb3AuthContext();
	const params = useParams()
	const { surveyId } = params;

	const web3 = new Web3(web3AuthProvider as any);

	const contractAddress = CryptoSurvey.address;
	const contractAbi = CryptoSurvey.abi; // Your contract ABI
	const contract = new web3.eth.Contract(contractAbi, contractAddress);



	useEffect(() => {
    const fetchData = async function (){
      console.log("ms",surveyList)
        // console.log("ms",surveyList)
        // let questionsCID = surveyList.map(item=>item.encryptedCID)
        // let question = questionsCID.map(async function(item) {return await downloadIPFS(item.encryptedCID)})

        // let QnA = question.map(item=>{return {id:item.id,question:item.question, answers:[]} })

        // let answersCID = []
        // surveyList.forEach(item=>{if (item.SurveyReplyanswersCID.push(item.SurveyReply)})
        // console.log(answersCID)
        // let answersObject = answersCID.map(async function(cid){ console.log(cid) ;let object = await downloadIPFS(cid); return object})
        // QnA.forEach((item)=>{
        //   for (let i =0; i< answersObject.length(); i++) {
        //     item.answers.push(Object[String(item.id)])
        //   }
        // })
        // console.log(QnA)
        // setSurveyQnA([...surveyQnA, QnA])
        console.log("Fetching survey data");

      // Step 1: Get encryptedCIDs for both questions and answers
			//@ts-ignore
      let questionsCID = surveyList.map(item => item.encryptedCID?? null);

      // Step 2: Download the question data from IPFS using downloadIPFS
      let questionPromises = questionsCID.map(async function(cid) {
        return await downloadIPFS(cid);
      });

      // Step 3: Wait for all question downloads to complete
      let questionData = await Promise.all(questionPromises);
      console.log("questiondata: ",questionData)

      let flattenedQuestionData = questionData.flat();

      // Step 4: Construct QnA object from questions
      let QnA = flattenedQuestionData.map(item => ({
        id: item.id,
        question: item.question,
        answers: [] // This will be populated later
      }));
      console.log("in between",QnA)

      // Step 5: Collect answer encryptedCID from surveyList
			//@ts-ignore
      let answersCID = [];
      surveyList.forEach(item => {
			//@ts-ignore
        if (item.SurveyReply) {
			//@ts-ignore
          item.SurveyReply.forEach(reply => {
            answersCID.push(reply.encryptedCID);
          });
        }
      });

      // Step 6: Download answer data from IPFS
			//@ts-ignore
      let answersPromises = answersCID.map(async function(cid) {
        return await downloadIPFS(cid);
      });

      // Step 7: Wait for all answer downloads to complete
      let answersData = await Promise.all(answersPromises);

      // Step 8: Map answers to the respective questions in QnA
      answersData.forEach((answerObj, index) => {
        if (answerObj) {
          let relatedQuestion = QnA.find(q => q.id === answerObj.relatedQuestionId); // Assuming there's a field linking answers to questions
          if (relatedQuestion) {
			//@ts-ignore
            relatedQuestion.answers.push(answerObj); // Push answers to the correct question
          }
        }
      });

      console.log("------------------------------------------")
      console.log(QnA);




    }
    fetchData()
    // if (!questions) {
    //   fetchData()
    // }
    },[surveyQnA])

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

