"use client";
import Container from "@/components/Container";
import Replies from "@/components/create/Replies";
import Requests from "@/components/create/Requests";
import Toggler from "@/components/create/Toggler";
import { useSurveyorContext } from "@/context/SurveyorProvider";

// list of replies
export default function View() {
  const { toggleReplies } = useSurveyorContext();
  return (
    <Container>
      <>
        <Toggler />
        {toggleReplies ? <Replies /> : <Requests />}
      </>
    </Container>
  );
}
