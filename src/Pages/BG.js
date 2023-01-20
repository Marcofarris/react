import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import './BG.css';
import Modal from 'react-bootstrap/Modal';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import CardsWrapper from "../components/CardsWrapper";

// Correggere indice negozio nel roll e nel turno


function BG() {
    const [congela, setCongela] = useState(false);

    const [negozio, setNegozio] = useState([{ card: 3, value: Math.floor(Math.random() * 11) }, { card: 4, value: Math.floor(Math.random() * 11) }, { card: 5, value: Math.floor(Math.random() * 11) }]);
    const [indiceMano, setIndiceMano] = useState(6);
    const [numeroCarte, setNumeroCarte] = useState(3);
    const [monete, setMonete] = useState(3);
    const [turno, setTurno] = useState(4);

    const [mano, setMano] = useState([{ card: 0, value: Math.floor(Math.random() * 11) }, { card: 1, value: Math.floor(Math.random() * 11) }, { card: 2, value: Math.floor(Math.random() * 11) }]);

    const [campo, setCampo] = useState({ card: -1, value: 1 });
    if (campo.value == 10) { alert('HAI VINTO') }
    if (turno == 10) { alert('HAI PERSO') }

    function Mano(valore, i) {
        if (monete >= 3 && numeroCarte < 6) {
            setIndiceMano(indiceMano + 1)
            const newCard = { card: indiceMano, value: valore };
            setMano([...mano, newCard]);

            setNegozio(negozio.filter(function (el) {
                return el.card != i
            }))

            setMonete(monete - 3)
            setNumeroCarte(numeroCarte + 1)

        } else {
            monete < 3 ? alert('non hai monete sufficienti') : alert('mano piena')
        }
    }


    function Campo(valore, i) {
        console.log(campo.value)
        if (valore == campo.value + 1) {
            const newCard = { card: i, value: valore };
            setCampo(newCard);

            setMano(mano.filter(function (el) {
                return el.card != i
            }))
            setNumeroCarte(numeroCarte - 1)
        }
    }


    function Negozio(props) {
        return <Col> <Button variant="dark" onClick={() => Mano(props.item, props.i)}> <CardsWrapper cardValue= {props.item}  /> </Button>  </Col>;
    }

    function RiempiMano(props) {
        return <Col> <Button variant="dark" onClick={() => Campo(props.item, props.i)}> <CardsWrapper cardValue= {props.item}  /> </Button> </Col>;
    }

    function RiempiCampo(props) {
        return <Col> <Button> {props.item} </Button> </Col>;
    }



    function Rolla() {
        if (monete >= 1) {
            setCongela(false);
            let rand1 = Math.floor(Math.random() * 11)
            let rand2 = Math.floor(Math.random() * 11)
            let rand3 = Math.floor(Math.random() * 11)

            setNegozio([{ card: 0, value: rand1 }, { card: 1, value: rand2 }, { card: 2, value: rand3 }])
            setMonete(monete - 1)
        } else {
            alert('non hai monete sufficienti')
        }
    }

    function Turno() {
        if (turno < 10) {
            if (congela == false) {
                let rand1 = Math.floor(Math.random() * 11)
                let rand2 = Math.floor(Math.random() * 11)
                let rand3 = Math.floor(Math.random() * 11)

                setNegozio([{ card: 0, value: rand1 }, { card: 1, value: rand2 }, { card: 2, value: rand3 }])
            }
            console.log(negozio.length)
            for (let j = 0; j < 3 - negozio.length; j++) {
                const newCard = { card: j, value: Math.floor(Math.random() * 11) };
                setNegozio([...negozio, newCard]);
            }
            setTurno(turno + 1)
            setMonete(turno)
        }

    }



    return (
        <>
            <h1>BG</h1>
            <Container fluid className='bg-dark'>
                <Row className='altezza'> Negozio
                    <Col xs={7}> <Row> {negozio.map((carta) => <Negozio key={carta.card} item={carta.value} i={carta.card} />)} </Row></Col>
                    <Col> <Row>
                        <Row> <Col> <Button onClick={Rolla}>Rolla</Button> </Col>
                            <Col> <Button onClick={Turno}>Turno</Button> </Col> </Row>

                        <Col className='m-1'> <Button onClick={() => setCongela(!congela)}> {congela ? 'Congelato' : 'Congela'}</Button> </Col>
                    </Row></Col>
                </Row>

                <Row className='altezza'> Campo
                    <Col> <Button variant="dark"> <CardsWrapper cardValue= {campo.value}/> </Button>  </Col>
                </Row>

                <Row className='altezza'> Mano
                    <Col xs={9}> <Row> {mano.map((carta) => <RiempiMano key={carta.card} item={carta.value} i={carta.card} />)} </Row></Col>
                    <Col> <Button>Monete: {monete} </Button> </Col>
                </Row>
            </Container>
        </>
    )

}

export default BG;