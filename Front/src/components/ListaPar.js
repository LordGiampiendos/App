import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { elimina, insertID, insertDT1 } from '../actions';
import { Link } from 'react-router-dom';

function ListaPar() {
    const object = useSelector(state => state.OB2);
    const DT = useSelector(state => state.DT1);
    const ogg = object;
    const dispatch = useDispatch();
    try {
        const stampa = ogg.map(objectS => (
            <tr>
                <th>{objectS.id}</th>
                <td>{objectS.nome_parcheggio}</td>
                <td><button id="bot" className = "pull-right"><Link to="/elimina" onClick={() => { dispatch(insertID(objectS.id)); dispatch(elimina('parcheggio'))}}>Elimina</Link></button></td>
            </tr>
        ))
        const dettagli = ogg.map(objectS => (
            <div id="div5">
                <ul><h1>Dettagli parcheggi</h1>
                    <li><p>ID: {objectS.id}</p></li>
                    <li><p>Nome parcheggio: {objectS.nome_parcheggio}</p></li>
                    <li><p>Luogo: {objectS.luogo}</p></li>
                    <li><p>Orario apertura: {objectS.orario_apertura}</p></li>
                    <li><p>Orario chiusura: {objectS.orario_chiusura}</p></li>
                </ul>
            </div>
        ))
        let scritta = DT ? (
            <div>
                {dettagli}
            </div>) : (null)
        return (
            <div id="div6">
                <br></br>
                <h1>Lista parcheggi</h1>
                <br></br>
                <table border='1'>
                    <tr>
                        <th>N°</th>
                        <td id="fl">Nome parcheggio</td>
                        <td id="fl">Elimina parcheggio</td>
                    </tr>
                    {stampa}
                </table>
                <br></br>
                <Link to="/insParcheggio" id="cl">Aggiungi parcheggio</Link>
                <p id="cl" onClick={() => dispatch(insertDT1())} >Dettagli</p>
                <br></br>
                {scritta}
                <br></br>
            </div>
        )
    }
    catch {
        return (
            <div id="div5">
                <br></br>
                <ul>
                    <br></br>
                    <h1>Nessun parcheggio</h1>
                </ul>
            </div>
        )
    }
}

export default ListaPar;