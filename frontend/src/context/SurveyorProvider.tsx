"use client";
import { createContext, ReactNode, useContext, useState } from "react";

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

type UserRequestType = {
  publicKey: string;
  surveyName: string;
};

const dummyUserRequests: UserRequestType[] = [
  {
    publicKey: "0x6fC9dC1b5e0D8C56F21635A904965c9D1b47D93D",
    surveyName: "Customer Satisfaction Survey",
  },
  {
    publicKey: "0x12FcD1bEb3a8CeAe30BdE35b6F41b356f4C7316f",
    surveyName: "Customer Satisfaction Survey",
  },
  {
    publicKey: "0x7f3f7BcC1d9D56F8A61E8cF9e4E0Df32121b2Bc8",
    surveyName: "Employee Feedback Survey",
  },
  {
    publicKey: "0x8Fb9E0A76D1D3EAE3f8D6BcC8f3c8F2D52b8D9Ba",
    surveyName: "Employee Feedback Survey",
  },
  {
    publicKey: "0xAc5F32CeBf8d41D5d8a41dF7C8a28Ec3bA47D9fE",
    surveyName: "Employee Feedback Survey",
  },
  {
    publicKey: "0x2Df4c3Bd98dF34Ba5C8d3aBc7bB6B7F5C4bF3D2B",
    surveyName: "Product Research Survey",
  },
  {
    publicKey: "0x9B2f2dB5Ac8Df12f5d7Bc1dD3d9eDf3C4Bf2E3D5",
    surveyName: "Product Research Survey",
  },
  { publicKey: "0x3A2f3dC1d9F56F8e8C3cF9f8F4E9Df3c21aB6cF", surveyName: "Product Research Survey" },
];

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

// Create the context
interface SurveyorContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  surveyList: SurveyDetailsType[];
  setSurveyList: (value: SurveyDetailsType[]) => void;
  surveyQnA: any;
  setSurveyQnA: (value: any) => void;
  selectedSurvey: any;
  setSelectedSurvey: (value: any) => void;
  requestList: any;
  setRequestList: (value: any) => void;
  toggleReplies: boolean;
  setToggleReplies: (value: boolean) => void;
}

const SurveyorContext = createContext<SurveyorContextType | undefined>(undefined);
export const SurveyorProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [surveyList, setSurveyList] = useState<SurveyDetailsType[]>(dummySurvey);
  const [surveyQnA, setSurveyQnA] = useState<any>(surveyData);
  const [selectedSurvey, setSelectedSurvey] = useState<any>();
  const [requestList, setRequestList] = useState<any>(dummyUserRequests);
  const [toggleReplies, setToggleReplies] = useState(false);

  return (
    <SurveyorContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        surveyList,
        setSurveyList,
        surveyQnA,
        setSurveyQnA,
        selectedSurvey,
        setSelectedSurvey,
        requestList,
        setRequestList,
        toggleReplies,
        setToggleReplies,
      }}
    >
      {children}
    </SurveyorContext.Provider>
  );
};

export const useSurveyorContext = (): SurveyorContextType => {
  const context = useContext(SurveyorContext);
  if (context === undefined) {
    throw new Error("useWeb3Auth must be used within a MyProvider");
  }
  return context;
};
