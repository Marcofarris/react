import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Outlet, Link } from "react-router-dom"; //Usare Link al posto di Button e stilizzare con css
import './style.css';
import { useState, useContext } from 'react';
import { IdContext } from '../Pages/Layout'

function BLeft() {
    const [name, setName] = useState("");

    const idUser = useContext(IdContext);
    const [stateId, setStateID] = idUser;

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(name)
        /* api login: ho lasciato console.log per vedere se ci sono errori ma va sostituito con setStateID(dataRes). Deve restituire l'id dell'utente
        fetch('http://3.82.150.130:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: {name}
            })
        })
            .then((response) => response.json())
            .then((dataRes) => console.log(dataRes))*/ // setStateID(dataRes)
    }

    return (
        <>
            <Container className='p-5'>
                <Link to="/fondo" className='bottoneLink m-1'>Fondo</Link><br />
                <Link to="/progetti" className='bottoneLink m-1'>Progetti</Link><br />
                <Link to="/gioco" className='bottoneLink m-1'>Gioco</Link><br />
                <Link to="/bg" className='bottoneLink m-1'>BG</Link><br />

                <form onSubmit={handleSubmit}>
                    <label>Enter your name:<br />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <input type="submit" />
                </form>
            </Container>

        </>
    );
}

export default BLeft;