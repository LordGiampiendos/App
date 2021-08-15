import React from 'react';
import { useDispatch } from 'react-redux';
import kaw from './ImmaginiWeb/Moto/Kawasaki z750.jpg'
import { scelta, mod, prezzo } from '../actions';
import {Link } from "react-router-dom";

function SpecificheBND5() {
    const dispatch = useDispatch();
    let modello = 'Kawasaki';
    let prezzoV = 6;
    return (
        <div id="div5">
            <br></br>
            <br></br>
            <center><img id="imgD" src={kaw} alt="Immagine Kawasaki"/></center>
            <br></br>
            <br></br>
            <ul id="ulD"><h1>Dati veicolo</h1>
                <li><p>Modello: {modello}</p></li>
                <li><p>Immatricolazione: PA0004</p></li>
                <li><p>Cilindrata: 650 cm³</p></li>
                <li><p>Numero posti: 1</p></li>
                <li><p>Tariffa: 6€ all'ora</p></li>
            </ul>
            <br></br>
            <br></br>
            <center><button type="button" className = "btn btn-primary pull-right"><Link to="/aggiorna4" onClick={() => { dispatch(scelta('noleggia')); dispatch(mod(modello)); dispatch(prezzo(prezzoV))}}>Noleggia</Link></button></center>
        </div>
    )
} 

export default SpecificheBND5;