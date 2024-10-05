import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Link from "next/link";
import { useGlobalContext } from "../context/GlobalProvider.jsx";

export function SelectionScreen() {
  const { account } = useGlobalContext();
  return (
    <Container className="flex justify-end">
      <div className="text-center">
        <Button className="bg-white border-white" style={{marginRight: "10px"}}>
          <Link style={{ color: "black", textDecoration: "none" }} href="/surveyor">
            Create
          </Link>
        </Button>
      </div>
      <div className="text-center">
        <Button className="bg-white border-white">
          <Link style={{ color: "black", textDecoration: "none" }} href="/participate">
            Participate
          </Link>
        </Button>
      </div>
    </Container>
  );
}
