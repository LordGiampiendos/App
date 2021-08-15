import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertDT, elimina, insertID, scelta, insertDI, insertOI, insertC } from '../actions';
import { Link } from 'react-router-dom';

function DettagliPrenotazione() {
    const object = useSelector(state => state.OB1);
    const objectR = useSelector(state => state.OB);
    const DT = useSelector(state => state.DT);
    const ogg = object;
    const dispatch = useDispatch();
    try {
        if(!object[0]) {
            return (
                <div id="div5">
                    <br></br>
                    <ul>
                        <br></br>
                        <h1>Nessuna prenotazione</h1>
                    </ul>
                </div>
            )
        }
        if(objectR[0].tipo === 'Admin') {
             const stampa = ogg.map(function(objectS) {
                if(objectS.restituito === 'Sì') {
                    return(
                    <tr id="trO">
                        <th>{objectS.id}</th>
                        <td>{objectS.id_utente}</td>
                        <td>{objectS.rilasciato_consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                    </tr>)
                }
                else {
                    return(
                    <tr>
                        <th>{objectS.id}</th>
                        <td>{objectS.id_utente}</td>
                        <td>{objectS.rilasciato_consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                        <td><button id="bot" className = "pull-right"><Link to="/elimina" onClick={() => { dispatch(insertID(objectS.id)); dispatch(elimina('prenotazione'))}}>Rimuovi</Link></button></td>
                    </tr>)
                }
            })
            const dettagli = ogg.map(objectS => (
                <div id="div5">
                    <ul><h1>Dettagli prenotazione</h1>
                        <li><p>ID: {objectS.id}</p></li>
                        <li><p>ID utente: {objectS.id_utente}</p></li>
                        <li><p>Data noleggio (iniziale): {objectS.data_noleggio_iniziale.slice(0,10)}</p></li>
                        <li><p>Data noleggio (finale): {objectS.data_noleggio_finale.slice(0,10)}</p></li>
                        <li><p>Orario noleggio (iniziale): {objectS.orario_noleggio_iniziale}</p></li>
                        <li><p>Orario noleggio (finale): {objectS.orario_noleggio_finale}</p></li>
                        <li><p>Luogo di rilascio o di ritiro: {objectS.luogo_rilascio_ritiro}</p></li>
                        <li><p>Modello: {objectS.modello}</p></li>
                        <li><p>Presenza autista: {objectS.presenza_autista}</p></li>
                        <li><p>Destinazione: {objectS.destinazione}</p></li>
                        <li><p>Metodo di pagamento: {objectS.metodo_pagamento}</p></li>
                        <li><p>Rilasciato o consegnato: {objectS.rilasciato_consegnato}</p></li>
                        <li><p>Costo della prenotazione: {objectS.costo_prenotazione}</p></li>
                        <li><p>Restituito: {objectS.restituito}</p></li>
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
                    <h1>Lista prenotazioni</h1>
                    <br></br>
                    <table border='1'>
                        <tr>
                            <th>N°</th>
                            <td id="fl">ID utente</td>
                            <td id="fl">Rilasciato o consegnato</td>
                            <td id="fl">Costo della prenotazione</td>
                            <td id="fl">Restituito</td>
                            <td id="fl">Annulla prenotazione</td>
                        </tr>
                        {stampa}
                    </table>
                    <p id="cl" onClick={() => dispatch(insertDT())} >Dettagli</p>
                    <br></br>
                    {scritta}
                    <br></br>
                </div>
            )
        }
        else if(objectR[0].tipo === 'Autista') {
            const stampa = ogg.map(function(objectS) {
                if(objectS.restituito === 'Sì') {
                    return(
                    <tr id="trO">
                        <th>{objectS.id}</th>
                        <td>{objectS.id_utente}</td>
                        <td>{objectS.rilasciato_consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                    </tr>)
                }
                else if(objectS.restituito === 'No' && objectS.rilasciato_consegnato === 'No') {
                    return(
                    <tr>
                        <th>{objectS.id}</th>
                        <td>{objectS.id_utente}</td>
                        <td>{objectS.rilasciato_consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                        <td><button id="bot" className = "pull-right"><Link to="/elimina" onClick={() => { dispatch(insertID(objectS.id)); dispatch(elimina('rilasciaL'))}}>Ritirato</Link></button></td>
                        <td><button id="bot" className = "pull-right"><Link to="/elimina" onClick={() => { dispatch(insertID(objectS.id)); dispatch(elimina('prenotazione'))}}>Restituito</Link></button></td>
                    </tr>)
                }
                else {
                    return(
                    <tr>
                        <th>{objectS.id}</th>
                        <td>{objectS.id_utente}</td>
                        <td>{objectS.rilasciato_consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                        <td></td>
                        <td><button id="bot" className = "pull-right"><Link to="/elimina" onClick={() => { dispatch(insertID(objectS.id)); dispatch(elimina('prenotazione'))}}>Restituito</Link></button></td>
                    </tr>)
                }
            })
            const dettagli = ogg.map(objectS => (
                <div id="div5">
                    <ul><h1>Dettagli prenotazione</h1>
                        <li><p>ID: {objectS.id}</p></li>
                        <li><p>ID utente: {objectS.id_utente}</p></li>
                        <li><p>Data noleggio (iniziale): {objectS.data_noleggio_iniziale.slice(0,10)}</p></li>
                        <li><p>Data noleggio (finale): {objectS.data_noleggio_finale.slice(0,10)}</p></li>
                        <li><p>Orario noleggio (iniziale): {objectS.orario_noleggio_iniziale}</p></li>
                        <li><p>Orario noleggio (finale): {objectS.orario_noleggio_finale}</p></li>
                        <li><p>Luogo di rilascio o di ritiro: {objectS.luogo_rilascio_ritiro}</p></li>
                        <li><p>Modello: {objectS.modello}</p></li>
                        <li><p>Presenza autista: {objectS.presenza_autista}</p></li>
                        <li><p>Destinazione: {objectS.destinazione}</p></li>
                        <li><p>Metodo di pagamento: {objectS.metodo_pagamento}</p></li>
                        <li><p>Rilasciato o consegnato: {objectS.rilasciato_consegnato}</p></li>
                        <li><p>Costo della prenotazione: {objectS.costo_prenotazione}</p></li>
                        <li><p>Restituito: {objectS.restituito}</p></li>
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
                    <h1>Lista prenotazioni</h1>
                    <br></br>
                    <table border='1'>
                        <tr>
                            <th>N°</th>
                            <td id="fl">ID utente</td>
                            <td id="fl">Rilasciato o consegnato</td>
                            <td id="fl">Costo della prenotazione</td>
                            <td id="fl">Restituito</td>
                            <td id="fl">Conferma rilascio</td>
                            <td id="fl">Conferma restituzione</td>
                        </tr>
                        {stampa}
                    </table>
                    <p id="cl" onClick={() => dispatch(insertDT())} >Dettagli</p>
                    <br></br>
                    {scritta}
                    <br></br>
                </div>
            )
        } 
        else if(objectR[0].tipo === 'Addetto alla consegna') {
             const stampa = ogg.map(function(objectS) {
                if(objectS.restituito === 'Sì') {
                    return(
                    <tr id="trO">
                        <th>{objectS.id}</th>
                        <td>{objectS.id_utente}</td>
                        <td>{objectS.rilasciato_consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                    </tr>)
                }
                else if(objectS.restituito === 'No' && objectS.rilasciato_consegnato === 'No') {
                    return(
                    <tr>
                        <th>{objectS.id}</th>
                        <td>{objectS.id_utente}</td>
                        <td>{objectS.rilasciato_consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                        <td><button id="bot" className = "pull-right"><Link to="/elimina" onClick={() => { dispatch(insertID(objectS.id)); dispatch(elimina('rilasciaL'))}}>Ritirato</Link></button></td>
                    </tr>)
                }
                else {
                    return(
                    <tr>
                        <th>{objectS.id}</th>
                        <td>{objectS.id_utente}</td>
                        <td>{objectS.rilasciato_consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                        <td></td>
                    </tr>)
                }
            })
            const dettagli = ogg.map(objectS => (
                <div id="div5">
                    <ul><h1>Dettagli prenotazione</h1>
                        <li><p>ID: {objectS.id}</p></li>
                        <li><p>ID utente: {objectS.id_utente}</p></li>
                        <li><p>Data noleggio (iniziale): {objectS.data_noleggio_iniziale.slice(0,10)}</p></li>
                        <li><p>Data noleggio (finale): {objectS.data_noleggio_finale.slice(0,10)}</p></li>
                        <li><p>Orario noleggio (iniziale): {objectS.orario_noleggio_iniziale}</p></li>
                        <li><p>Orario noleggio (finale): {objectS.orario_noleggio_finale}</p></li>
                        <li><p>Luogo di rilascio o di ritiro: {objectS.luogo_rilascio_ritiro}</p></li>
                        <li><p>Modello: {objectS.modello}</p></li>
                        <li><p>Presenza autista: {objectS.presenza_autista}</p></li>
                        <li><p>Destinazione: {objectS.destinazione}</p></li>
                        <li><p>Metodo di pagamento: {objectS.metodo_pagamento}</p></li>
                        <li><p>Rilasciato o consegnato: {objectS.rilasciato_consegnato}</p></li>
                        <li><p>Costo della prenotazione: {objectS.costo_prenotazione}</p></li>
                        <li><p>Restituito: {objectS.restituito}</p></li>
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
                    <h1>Lista prenotazioni</h1>
                    <br></br>
                    <table border='1'>
                        <tr>
                            <th>N°</th>
                            <td id="fl">ID utente</td>
                            <td id="fl">Rilasciato o consegnato</td>
                            <td id="fl">Costo della prenotazione</td>
                            <td id="fl">Restituito</td>
                            <td id="fl">Conferma rilascio</td>
                        </tr>
                        {stampa}
                    </table>
                    <p id="cl" onClick={() => dispatch(insertDT())} >Dettagli</p>
                    <br></br>
                    {scritta}
                    <br></br>
                </div>
            )
        }
        else {
            const stampa = ogg.map(function(objectS) {
                if(objectS.restituito === 'Sì') {
                    return(
                    <tr id="trO">
                        <th>{objectS.id}</th>
                        <td>{objectS.rilasciato}</td>
                        <td>{objectS.consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                    </tr>)
                }
                else if(objectS.restituito === 'No' && objectS.rilasciato_consegnato === 'No') {
                    return(
                    <tr>
                        <th>{objectS.id}</th>
                        <td>{objectS.rilasciato}</td>
                        <td>{objectS.consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                        <td></td>
                        <td><button id="bot" className = "pull-right"><Link to="/elimina" onClick={() => { dispatch(insertID(objectS.id)); dispatch(elimina('prenotazione'))}}>Annulla</Link></button></td>
                        <td><button id="bot" className = "pull-right"><Link to="/elimina" onClick={() => { dispatch(insertID(objectS.id)); dispatch(elimina('rilascia'))}}>Ritirato</Link></button></td>
                        <td></td>
                    </tr>)
                }
                else {
                    return(
                    <tr>
                        <th>{objectS.id}</th>
                        <td>{objectS.rilasciato}</td>
                        <td>{objectS.consegnato}</td>
                        <td>{objectS.costo_prenotazione}</td>
                        <td>{objectS.restituito}</td>
                        <td><button id="bot" className = "pull-right"><Link to="/aggiorna4" onClick={() => { dispatch(scelta('ritardo')); dispatch(insertID(objectS.id)); dispatch(insertDI(objectS.data_noleggio_iniziale)); dispatch(insertOI(objectS.orario_noleggio_iniziale)); dispatch(insertC(objectS.costo_prenotazione))}}>Notifica</Link></button></td>
                        <td></td>
                        <td></td>
                        <td><button id="bot" className = "pull-right"><Link to="/elimina" onClick={() => { dispatch(insertID(objectS.id)); dispatch(elimina('prenotazione'))}}>Restituito</Link></button></td>
                    </tr>)
                }
            })
            const dettagli = ogg.map(objectS => (
                <div id="div5">
                    <ul><h1>Dettagli prenotazione</h1>
                        <li><p>ID: {objectS.id}</p></li>
                        <li><p>Data noleggio (iniziale): {objectS.data_noleggio_iniziale.slice(0,10)}</p></li>
                        <li><p>Data noleggio (finale): {objectS.data_noleggio_finale.slice(0,10)}</p></li>
                        <li><p>Orario noleggio (iniziale): {objectS.orario_noleggio_iniziale}</p></li>
                        <li><p>Orario noleggio (finale): {objectS.orario_noleggio_finale}</p></li>
                        <li><p>Luogo di rilascio o di ritiro: {objectS.luogo_rilascio_ritiro}</p></li>
                        <li><p>Modello: {objectS.modello}</p></li>
                        <li><p>Presenza autista: {objectS.presenza_autista}</p></li>
                        <li><p>Destinazione: {objectS.destinazione}</p></li>
                        <li><p>Metodo di pagamento: {objectS.numero_carta}</p></li>
                        <li><p>Rilasciato: {objectS.rilasciato}</p></li>
                        <li><p>Consegnato: {objectS.consegnato}</p></li>
                        <li><p>Costo della prenotazione: {objectS.costo_prenotazione}</p></li>
                        <li><p>Restituito: {objectS.restituito}</p></li>
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
                    <h1>Lista prenotazioni</h1>
                    <br></br>
                    <table border='1'>
                        <tr>
                            <th>N°</th>
                            <td id="fl">Rilasciato</td>
                            <td id="fl">Consegnato</td>
                            <td id="fl">Costo della prenotazione</td>
                            <td id="fl">Restituito</td>
                            <td id="fl">Notifica ritardo</td>
                            <td id="fl">Annulla prenotazione</td>
                            <td id="fl">Conferma rilascio</td>
                            <td id="fl">Conferma restituzione</td>
                        </tr>
                        {stampa}
                    </table>
                    <p id="cl" onClick={() => dispatch(insertDT())} >Dettagli</p>
                    <br></br>
                    {scritta}
                    <br></br>
                </div>
            )
        }
    }       
    catch {
        return (
            <div id="div5">
                <br></br>
                <ul>
                    <br></br>
                    <h1>Nessuna prenotazione</h1>
                </ul>
            </div>
        )
    }
} 

export default DettagliPrenotazione;