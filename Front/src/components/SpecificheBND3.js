import React from 'react';
import { useDispatch } from 'react-redux';
import panda from './ImmaginiWeb/Automobili/Panda.jpg';
import { scelta, mod, prezzo } from '../actions';
import {Link } from "react-router-dom";

function SpecificheBND3() {
    const dispatch = useDispatch();
    let modello = 'Panda';
    let prezzoV = 5;
    return (
        <div id="div5">
            <br></br>
            <br></br>
            <center><img id="imgD" src={panda} alt="Immagine Panda"/></center>
            <br></br>
            <br></br>
            <ul id="ulD"><h1>Dati veicolo</h1>
                <li><p>Modello: {modello}</p></li>
                <li><p>Immatricolazione: PA0002</p></li>
                <li><p>Cilindrata: 1200 cm³</p></li>
                <li><p>Numero posti: 4</p></li>
                <li><p>Tariffa: 5€ all'ora</p></li>
            </ul>
            <br></br>
            <br></br>
            <center><button type="button" className = "btn btn-primary pull-right"><Link to="/aggiorna4" onClick={() => { dispatch(scelta('noleggia')); dispatch(mod(modello)); dispatch(prezzo(prezzoV))}}>Noleggia</Link></button></center>
        </div>
    )
} 

export default SpecificheBND3;