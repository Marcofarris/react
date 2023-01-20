/** Gioco d'azzardo a tema investimento. Si può estendere e complicare con una finta logica economica interna? 
 * 
 * Per paura di dover restituire cifre troppo grandi si può mettere un limite alla vincita. Ad esempio una volta vinto il doppio finisci il gioco e devi ripuntare, 
 * Mettendo un limite anche alla cifra che giochi. 
 * 
 * Perchè qualcuno dovrebbe giocare? In primis la probabilità di vittoria effettiva è alta rispetto alle slot, in più c'è la possibilità di far fruttare i soldi senza un 
 * contatto diretto, si puo controllare il fondo in qualsiasi momento
 * 
 * Percentuale di vittoria legata a percentuale di chi perde, in modo da pararsi un po. Far giocare la curva in modo da far giocare i soldi tra loro.
 * 
 * Dopo un bel po la probabilità di ritornare pari è molto alta, magari mettere un paletto e prelevare i soldi una volta raggiunta una soglia.
 * 
 * Far girare solo i soldi inseriti. Probabilità che il gioco ti si interrompa, si puà uscire ad una certa condizione o quando si vuole. Mi sto spingendo sempre più verso il gioco,
 * non è la mia intenzione principale. Se possibile trovare un metodo simile ad un investimento. Gioco a soldi dove ognuno mette una quota, il fondo si distribuisce, ad un certo 
 * è possibile premere un tasto, chi fa prima può decidree se far continuare il gioco oppure no. 
 * Oppure piuttosto che il bottone la richiesta viene fatta a caso ad uno dei partecipanti
 * 
 * Quello piu promettente è il gioco d'azzardo a tema investimento, con la possibilità di vincere o perdere in proporzione alla tua quota sul totale. 
 * Il guadagno può essere su una parte che il giocatore vince e ritira, oppure senza guadagno diretto,
 * ma dagli investimenti fatti con il fondo (però dovrebbero permettere di ritirare i soldi in qualsiasi momento)
 */

import Container from 'react-bootstrap/Container';
import './style.css';
import { useState, useEffect, PureComponent, useContext } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { IdContext } from '../Pages/Layout'


function Progetti() {
    const arrayProva = { x: 50, y: 50, z: 50 }

        arrayProva.x = (Math.floor(Math.random() * 101))
        arrayProva.y = (Math.floor(Math.random() * (101 - arrayProva.x)))
        arrayProva.z = 100 - arrayProva.x - arrayProva.y
 
    console.log(arrayProva)


    const [totale, setTotale] = useState(100000); //Non il totale del fondo, ma quello su cui si calcola la %
    const [value, setValue] = useState(5000); // valore fondo attuale
    const [quota, setQuota] = useState(value * 100 / totale);
    const [isGame, setIsGame] = useState(false);
    const [valueTempo, setValueTempo] = useState(0);
    const [valueGr, setValueGr] = useState([{ tempo: 0, valore: 5000 }]);

    const [fondoMod, setFondoMod] = useState({ valoreDaMod: 0, action: '' });

    const idUser = useContext(IdContext);
    const [stateId, setStateID] = idUser;

    /* api per prendere il valore del fondo dell'utente, deve restituire il fondo attuale e l'array con tutti i valori ottenuti (valore e tempo)
    fetch('http://3.82.150.130:8000/auth/getuserS', {
   method: 'GET',
   headers: {
       'Content-Type': 'application/json'
     },
   body: JSON.stringify({
       userId: stateId
   })
})
   .then((response) => response.json())
   .then((dataRes) => console.log(dataRes))*/ // setValue(dataRes.valoreAttualeFondo), setValueGr(dataRes.arrayValori)


    const probability = (n) => {
        return Math.random() < n;
    }

    if (isGame) {
        const timeOut = setTimeout(() => {
            setValueTempo(valueTempo + 1)
            let rand = Math.floor(Math.random() * 2);
            if (rand == 0) {
                setValue(value + quota * value / 100)
            } else {
                setValue(value - quota * value / 100)
            }
            setQuota(value * 100 / totale)
            const newTask = { valore: value, tempo: valueTempo };
            setValueGr([...valueGr, newTask]);

           
        }, 1000);
    }




    const ferma = () => {
        setIsGame(false)
    }

    const gioca = () => {
        setIsGame(true)
    }

    const modificaFondo = (azione) => {
        if (azione == 'aggiungi') {
            setFondoMod({ valoreDaMod: 0, action: 'aggiungi' })
        } else {
            setFondoMod({ valoreDaMod: 0, action: 'ritira' })
        }

        /*fetch('http://3.82.150.130:8000/auth/getuserS', {
method: 'put',
headers: {
   'Content-Type': 'application/json'
 },
body: JSON.stringify({
   valoreMod: fondoMod
})
})
.then((response) => response.json())
.then((dataRes) => console.log(dataRes))*/ // 
        setFondoMod(null)
    }




    /* prob 10% di vincere
     useEffect(() => {
       setTimeout(() => {
           if(probability(0.10)){
               setValue(value + 100)
               console.log('vinto')
           } else {
               setValue(value - 100)
               
           }
       
       }, 100);
   
     });
   
  */


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
                        <Button className='m-2' variant="dark" onClick={() => modificaFondo('aggiungi')}>Aggiungi</Button>
                        <Button variant="dark" onClick={() => modificaFondo('ritira')}>Ritira</Button>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                        <Button className='m-2' variant="dark" onClick={gioca}>Gioca</Button>
                        <Button variant="dark" onClick={ferma}>Stop</Button>
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

export default Progetti;

/**
    

 */