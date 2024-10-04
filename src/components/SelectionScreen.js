import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Link from "next/link";
import { useGlobalContext } from "../context/GlobalProvider.jsx";

export function SelectionScreen() {
  const {account} = useGlobalContext()
  return (
    <Container>
      
        <div className="mb-5 text-center">
        <Button><Link style={{color:"white", textDecoration:"none"}} href="/create">Create Survey</Link></Button>
        </div>
        <div className="text-center">
        <Button><Link style={{color:"white", textDecoration:"none"}} href="/participate">Participate in Survey</Link></Button>
        </div>
         
    </Container>
  );
}
