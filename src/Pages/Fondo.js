import Container from 'react-bootstrap/Container';
import './style.css';
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Fondo() {
    const [value, setValue] = useState(50000);
    const [valueGr, setValueGr] = useState([{ tempo: 0, valore: 5000 }]);

     /*fetch('http://3.82.150.130:8000/auth/getuserS', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        userId: stateId
    })
})
    .then((response) => response.json())
    .then((dataRes) => console.log(dataRes))*/ // setValue(dataRes)

    return (
        <>
            <Container className='p-5 altezzaFissa'>
                <Row className='altezzaDivFondo'>
                    <Col className='d-flex justify-content-center align-items-center divFondo'>
                        {value} euro
                    </Col>
                </Row>
                <Row className='altezzaDivFondo'>
                    <Col className='d-flex justify-content-center align-items-center formatFondo'>
                    </Col>
                    <Col  className='d-flex justify-content-center align-items-center'>
                    </Col>
                </Row>

                <Row>
                    <ResponsiveContainer width="100%" aspect={2}>
                        <LineChart width={730} height={250} data={valueGr}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tempo" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="valore" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>

                </Row>
            </Container>

        </>
    );
}

export default Fondo;