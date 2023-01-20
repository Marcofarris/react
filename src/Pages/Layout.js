import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Testata from "../Pages/Testata";
import BLeft from "../Pages/BLeft";

import { useState, createContext, useContext } from "react";
import { nanoid } from "nanoid";

export const IdContext = createContext();

const Layout = () => {

    const [userId, setUserId] = useState('');

    return (
        <> <IdContext.Provider  value = {[userId, setUserId]}>
            <Testata></Testata>
            <Container fluid>
                <Row>
                    <Col xs={3}>
                        <BLeft></BLeft>
                    </Col>
                    <Col xs={6}>
                    <Outlet  />
                    </Col>
                    <Col xs={3}>
                    </Col>
                </Row>
            </Container>
            </IdContext.Provider>
        </>
    )
};

export default Layout;