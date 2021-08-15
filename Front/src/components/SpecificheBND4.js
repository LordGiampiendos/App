import React from 'react';
import { useDispatch } from 'react-redux';
import bmw from './ImmaginiWeb/Moto/Bmw s1000rr.jpg';
import { scelta, mod, prezzo } from '../actions';
import {Link } from "react-router-dom";

function SpecificheBND4() {
    const dispatch = useDispatch();
    let modello = 'Bmw';
    let prezzoV = 7;
    return (
        <div id="div5">
            <br></br>
            <br></br>
            <center><img id="imgD" src={bmw} alt="Immagine Bmw"/></center>
            <br></br>
            <br></br>
            <ul id="ulD"><h1>Dati veicolo</h1>
                <li><p>Modello: {modello}</p></li>
                <li><p>Immatricolazione: PA0003</p></li>
                <li><p>Cilindrata: 1000 cm³</p></li>
                <li><p>Numero posti: 1</p></li>
                <li><p>Tariffa: 7€ all'ora</p></li>
            </ul>
            <br></br>
            <br></br>
            <center><button type="button" className = "btn btn-primary pull-right"><Link to="/aggiorna4" onClick={() => { dispatch(scelta('noleggia')); dispatch(mod(modello)); dispatch(prezzo(prezzoV))}}>Noleggia</Link></button></center>
        </div>
    )
} 

export default SpecificheBND4;