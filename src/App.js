import logo from './logo.svg';
import './App.css';
import Testata from "../Pages/Testata";
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <>
    <Testata></Testata>
    <Container fluid>
        <Row>
            <Col xs={3}>
                
            </Col>
            <Col xs={6}>
            <Outlet  />
            </Col>
            <Col xs={3}>
            </Col>
        </Row>
    </Container>

</>
  );
}

export default App;
