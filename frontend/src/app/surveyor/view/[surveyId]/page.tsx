"use client";
import Container from "@/components/Container";
import Replies from "@/components/create/Replies";
import Requests from "@/components/create/Requests";
import Toggler from "@/components/create/Toggler";
import { useSurveyorContext } from "@/context/SurveyorProvider";
import { useWeb3AuthContext } from "@/context/Web3AuthProvider";
import { useParams } from 'next/navigation';


// list of replies
export default function View() {
  const { surveyList, toggleReplies } = useSurveyorContext();
  const params = useParams();
  const {surveyId} = params;
  
  return (
    <Container>
      <>
        <Toggler />
        {toggleReplies ? <Replies /> : <Requests />}
      </>
    </Container>
  );
}
