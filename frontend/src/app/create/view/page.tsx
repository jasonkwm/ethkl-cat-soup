import Container from "@/components/Container";
import Replies from "@/components/create/Replies";
import Toggler from "@/components/create/Toggler";

// list of replies
export default function View() {
  return (
    <Container>
      <>
        <Toggler />
        <Replies />
      </>
    </Container>
  );
}
