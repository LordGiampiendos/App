import React from 'react';
import { useDispatch } from 'react-redux';
import bp from './ImmaginiWeb/Biciclette/Bici da Passeggio.jpg';
import { scelta, mod, prezzo } from '../actions';
import { Link } from "react-router-dom";

function SpecificheBND9() {
    const dispatch = useDispatch();
    let modello = 'Bici da Passeggio';
    let prezzoV = 2.5;
    return (
        <div id="div5">
            <br></br>
            <br></br>
            <center><img id="imgD" src={bp} alt="Immagine Bici da Passeggio"/></center>
            <br></br>
            <br></br>
            <ul id="ulD"><h1>Dati veicolo</h1>
                <li><p>Modello: {modello}</p></li>
                <li><p>Immatricolazione: Nessuna</p></li>
                <li><p>Cilindrata: Nessuna</p></li>
                <li><p>Numero posti: 1</p></li>
                <li><p>Tariffa: 2€ all'ora</p></li>
            </ul>
            <br></br>
            <br></br>
            <center><button type="button" className = "btn btn-primary pull-right"><Link to="/aggiorna4" onClick={() => { dispatch(scelta('noleggia')); dispatch(mod(modello)); dispatch(prezzo(prezzoV))}}>Noleggia</Link></button></center>
        </div>
    )
} 

export default SpecificheBND9;