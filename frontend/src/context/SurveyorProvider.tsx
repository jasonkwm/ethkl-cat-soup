"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
}

const SurveyorContext = createContext<SurveyorContextType | undefined>(undefined);
export const SurveyorProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [surveyList, setSurveyList] = useState<SurveyDetailsType[]>(dummySurvey);
  const [surveyQnA, setSurveyQnA] = useState<any>(surveyData);

  return (
    <SurveyorContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        surveyList,
        setSurveyList,
        surveyQnA,
        setSurveyQnA,
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
