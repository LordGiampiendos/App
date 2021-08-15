import React from 'react';
import { useDispatch } from 'react-redux';
import audi from './ImmaginiWeb/Automobili/Audi A3.jpg';
import { scelta, mod, prezzo } from '../actions';
import {Link } from "react-router-dom";

function SpecificheBND2() {
    const dispatch = useDispatch();
    let modello = 'Audi A3';
    let prezzoV = 7.5;
    return (
        <div id="div5">
            <br></br>
            <br></br>
            <center><img id="imgD" src={audi} alt="Immagine Audi"/></center>
            <br></br>
            <br></br>
            <ul id="ulD"><h1>Dati veicoli</h1>
                <li><p>Modello: {modello}</p></li>
                <li><p>Immatricolazione: PA0001</p></li>
                <li><p>Cilindrata: 2000 cm³</p></li>
                <li><p>Numero posti: 5</p></li>
                <li><p>Tariffa: 7.5€ all'ora</p></li>
            </ul>
            <br></br>
            <br></br>
            <center><button type="button" className = "btn btn-primary pull-right"><Link to="/aggiorna4" onClick={() => { dispatch(scelta('noleggia')); dispatch(mod(modello)); dispatch(prezzo(prezzoV))}}>Noleggia</Link></button></center>
        </div>
    )
} 

export default SpecificheBND2;