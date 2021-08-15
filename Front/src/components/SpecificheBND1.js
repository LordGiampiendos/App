import React from 'react';
import { useDispatch } from 'react-redux';
import lambo from './ImmaginiWeb/Automobili/LamborghiniHuracane.jpg';
import { scelta, mod, prezzo } from '../actions';
import {Link } from "react-router-dom";

function SpecificheBND1() {
    const dispatch = useDispatch();
    let modello = 'Lamborghini Huracane';
    let prezzoV = 9;
    return (
        <div id="div5">
            <br></br>
            <br></br>
            <center><img id="imgD" src={lambo} alt="Immagine Lamborghini"/></center>
            <br></br>
            <br></br>
            <ul id="ulD"><h1>Dati veicolo</h1>
                <li><p>Modello: {modello}</p></li>
                <li><p>Immatricolazione: PA0000</p></li>
                <li><p>Cilindrata: 5200 cm³</p></li>
                <li><p>Numero posti: 2</p></li>
                <li><p>Tariffa: 9€ all'ora</p></li>
            </ul>
            <br></br>
            <br></br>
            <center><button type="button" className = "btn btn-primary pull-right"><Link to="/aggiorna4" onClick={() => { dispatch(scelta('noleggia')); dispatch(mod(modello)); dispatch(prezzo(prezzoV))}}>Noleggia</Link></button></center>
        </div>
    )
} 

export default SpecificheBND1;