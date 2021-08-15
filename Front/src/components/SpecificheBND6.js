import React from 'react';
import { useDispatch } from 'react-redux';
import vespa from './ImmaginiWeb/Moto/Vespa.jpg';
import { scelta, mod, prezzo } from '../actions';
import {Link } from "react-router-dom";

function SpecificheBND6() {
    const dispatch = useDispatch();
    let modello = 'Vespa';
    let prezzoV = 3.5;
    return (
        <div id="div5">
            <br></br>
            <br></br>
            <center><img id="imgD" src={vespa} alt="Immagine Vespa"/></center>
            <br></br>
            <br></br>
            <ul id="ulD"><h1>Dati veicolo</h1>
                <li><p>Modello: {modello}</p></li>
                <li><p>Immatricolazione: PA0005</p></li>
                <li><p>Cilindrata: 125 cm³</p></li>
                <li><p>Numero posti: 1</p></li>
                <li><p>Tariffa: 3.5€ all'ora</p></li>
            </ul>
            <br></br>
            <br></br>
            <center><button type="button" className = "btn btn-primary pull-right"><Link to="/aggiorna4" onClick={() => { dispatch(scelta('noleggia')); dispatch(mod(modello)); dispatch(prezzo(prezzoV))}}>Noleggia</Link></button></center>
        </div>
    )
} 

export default SpecificheBND6;