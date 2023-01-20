import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import './Gioco.css';
import Modal from 'react-bootstrap/Modal';

import { PieChart, Pie, ResponsiveContainer } from 'recharts';

function Gioco() {
    const datiGiocatori = [{ nome: 'Are', fondo: 100, jolly: '' }, { nome: 'Ere', fondo: 100, jolly: '' }, { nome: 'Ire', fondo: 100, jolly: '' }]
    const [giocatori, setGiocatori] = useState(datiGiocatori);
    const [game, setGame] = useState(false);
    const [vincitore, setVincitore] = useState();

    const data01 = [
        {
            "name": "Are",
            "value": giocatori[0].fondo
        },
        {
            "name": "Ere",
            "value": giocatori[1].fondo
        },
        {
            "name": "Ire",
            "value": giocatori[2].fondo
        }
    ];


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (game) {
        const timeOut = setTimeout(() => {
            let jollyAre;
            let jollyEre;
            let jollyIre;

            let x = (Math.floor(Math.random() * 301))
            let y = (Math.floor(Math.random() * (301 - x)))
            let z = 300 - x - y

            let rand = Math.floor(Math.random() * 3);
            (rand == 0) ? jollyAre = 'YES' : jollyAre = '';
            (rand == 1) ? jollyEre = 'YES' : jollyEre = '';
            (rand == 2) ? jollyIre = 'YES' : jollyIre = '';

            setGiocatori([
                { nome: 'Are', fondo: x, jolly: jollyAre },
                { nome: 'Ere', fondo: y, jolly: jollyEre },
                { nome: 'Ire', fondo: z, jolly: jollyIre }])

            if (x > 100 && jollyAre == 'YES' || y > 100 && jollyEre == 'YES' || z > 100 && jollyIre == 'YES') {
                setGame(false);
                handleShow();
            }
        }, 2000);
    } else {
    }


    function Lista(props) {
        return <li > {props.item}</li>;
    }


    return (
        <>
            <h1>Gioco</h1>
            <Container fluid>
                <Row className='altezzaMedia'>
                    <Col className='larghezzaMedia'>
                        <Row>
                            <Col>
                                Jolly
                                {giocatori.map((giocatore) => <Lista key={giocatore.nome} item={giocatore.jolly} />)}
                            </Col>
                            <Col>
                                Giocatore
                                {giocatori.map((giocatore) => <Lista key={giocatore.nome} item={giocatore.nome} />)}
                            </Col>
                            <Col>
                                Fondo
                                {giocatori.map((giocatore) => <Lista key={giocatore.nome} item={giocatore.fondo} />)}
                            </Col>
                        </Row>
                    </Col>
                    <Col className='justify-content-center align-items-center d-flex'>
                        <ResponsiveContainer width="100%" aspect={1}>
                            <PieChart width={730} height={250}>
                                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
                <Row>
                    <Button onClick={() => setGame(true)}>Gioca</Button>
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {giocatori[0].fondo > 100 ? 'Are ha vinto ' + giocatori[0].fondo : 'Are ha perso'}
                        {giocatori[1].fondo > 100 ? 'Ere ha vinto ' + giocatori[1].fondo : 'Ere ha perso'}
                        {giocatori[2].fondo > 100 ? 'Ire ha vinto ' + giocatori[2].fondo : 'Ire ha perso'}
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    )

}

export default Gioco;