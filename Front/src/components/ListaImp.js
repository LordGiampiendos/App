import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { elimina, insertID, insertDT2 } from '../actions';
import { Link } from 'react-router-dom';

function ListaImp() {
    const object = useSelector(state => state.OB3);
    const DT = useSelector(state => state.DT2);
    const ogg = object;
    const dispatch = useDispatch();
    try {
        const stampa = ogg.map(objectS => (
            <tr>
                <th>{objectS.id}</th>
                <td>{objectS.nome}</td>
                <td><button id="bot" className = "pull-right"><Link to="/elimina" onClick={() => { dispatch(insertID(objectS.id)); dispatch(elimina('impiegato'))}}>Elimina</Link></button></td>
            </tr>
        ))
        const dettagli = ogg.map(objectS => (
            <div id="div5">
                <ul><h1>Dettagli impiegati</h1>
                    <li><p>E-mail: {objectS.email}</p></li>
                    <li><p>Password: {objectS.password}</p></li>
                    <li><p>Cognome e Nome: {objectS.nome}</p></li>
                    <li><p>Genere: {objectS.genere}</p></li>
                    <li><p>Regione: {objectS.regione}</p></li>
                    <li><p>Provincia: {objectS.provincia}</p></li>
                    <li><p>Città: {objectS.comune}</p></li>
                    <li><p>Data di Nascita: {objectS.data_nascita}</p></li>
                    <li><p>Via/Piazza: {objectS.via}</p></li>
                    <li><p>N°: {objectS.numero}</p></li>
                    <li><p>CAP: {objectS.cap}</p></li>
                    <li><p>Località: {objectS.localita}</p></li>
                    <li><p>Telefono: {objectS.telefono}</p></li>
                    <li><p>Tipo: {objectS.tipo}</p></li>
                </ul>
                <ul><h1>Dati carta:</h1>
                    <li><p>Numero Carta: {objectS.numero_carta}</p></li>
                    <li><p>Nominativo: {objectS.nominativo_p}</p></li>
                    <li><p>Data Scadenza: {objectS.data_scadenza}</p></li>
                    <li><p>Codice di Sicurezza: {objectS.codice_sicurezza}</p></li>
                </ul>
                <ul><h1>Dati patente:</h1>
                    <li><p>Identificativo: {objectS.identificativo}</p></li>
                    <li><p>Nazionalità Patente: {objectS.nazionalità_patente}</p></li>
                    <li><p>Data Rilascio: {objectS.data_rilascio}</p></li>
                    <li><p>Data Scadenza: {objectS.data_scadenza2}</p></li>
                    <li><p>Nominativo: {objectS.nominativo_pat}</p></li>
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
                <h1>Lista impiegati</h1>
                <br></br>
                <table border='1'>
                    <tr>
                        <th>N°</th>
                        <td id="fl">Nome impiegato</td>
                        <td id="fl">Elimina impiegato</td>
                    </tr>
                    {stampa}
                </table>
                <br></br>
                <Link to="/registrazioneA" id="cl">Aggiungi impiegato</Link>
                <p id="cl" onClick={() => dispatch(insertDT2())} >Dettagli</p>
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
                    <h1>Nessun impiegato</h1>
                </ul>
            </div>
        )
    }
}

export default ListaImp;