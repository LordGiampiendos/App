import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertU, insertP, login, elimina, insertOB, admin, scelta, unadmin } from '../actions';
import { Link } from 'react-router-dom';

function GestioneAccBND(props) {
    const dispatch = useDispatch();
    const email = useSelector(state => state.email);
    const password = useSelector(state => state.password);
    const object = useSelector(state => state.OB);
    dispatch(login());
    try {
        if(typeof props.location.state.object !== "undefined") {
            dispatch(insertOB(props.location.state.object));
            dispatch(insertU(props.location.state.email));
            dispatch(insertP(props.location.state.password));
            if(object[0].tipo !== 'Admin') {
                dispatch(unadmin());
            }
            window.localStorage.setItem("utente", JSON.stringify(object));
            window.localStorage.setItem("email", JSON.stringify(email));
            window.localStorage.setItem("password", JSON.stringify(password));
        }
        if(object[0].tipo === "Admin") {
            dispatch(admin());
        }
    }
    catch {
        console.log('Stesso utente');
    }
    let scritta;
    let inserisci;
    try {
        if(!object[0].identificativo && !object[0].numero_carta) {
            scritta = (
                <div></div>
            );
            inserisci = (
                <ul><h1>Inserisci</h1>
                    <Link id="link" to="/aggiorna4" onClick={() => dispatch(scelta('pagamento'))}>Inserisci Metodo Pagamento</Link>
                    <br></br>
                    <Link id="link" to="/aggiorna4" onClick={() => dispatch(scelta('patente'))}>Inserisci Patente</Link>
                </ul>
            );
        }
        else if(!object[0].identificativo && object[0].numero_carta) {
            scritta = (
            <ul><h1>Dati carta:</h1>
                <li><p>Numero Carta: {object[0].numero_carta}</p></li>
                <li><p>Nominativo: {object[0].nominativo_p}</p></li>
                <li><p>Data Scadenza: {object[0].data_scadenza}</p></li>
                <li><p>Codice di Sicurezza: {object[0].codice_sicurezza}</p></li>
                <Link id="link" to="aggiorna4" onClick={() => dispatch(scelta('pagamento'))}>Modifica</Link>
                <br></br>
                <Link id="link" to='/elimina' onClick={() => dispatch(elimina('pagamento'))}>Rimuovi Metodo Pagamento</Link>
            </ul>
            );
            inserisci = (
                <ul><h1>Inserisci</h1>
                    <Link id="link" to="/aggiorna4" onClick={() => dispatch(scelta('patente'))}>Inserisci Patente</Link>
                </ul>
            );
        }
        else if(object[0].identificativo && !object[0].numero_carta) {
            scritta = (
            <ul><h1>Dati patente:</h1>
                <li><p>Identificativo: {object[0].identificativo}</p></li>
                <li><p>Nazionalità Patente: {object[0].nazionalità_patente}</p></li>
                <li><p>Data Rilascio: {object[0].data_rilascio}</p></li>
                <li><p>Data Scadenza: {object[0].data_scadenza2}</p></li>
                <li><p>Nominativo: {object[0].nominativo2}</p></li>
                <Link id="link" to="/aggiorna4" onClick={() => dispatch(scelta('patente'))}>Modifica</Link>
                <br></br>
                <Link id="link" to='/elimina' onClick={() => dispatch(elimina('patente'))}>Rimuovi Patente</Link>
            </ul>
            );
            inserisci = (
                <ul><h1>Inserisci</h1>
                    <Link id="link" to="/aggiorna4" onClick={() => dispatch(scelta('pagamento'))}>Inserisci Metodo Pagamento</Link>
                </ul>
            );
        }
        else {
           scritta = (
            <div>
                <ul><h1>Dati carta:</h1>
                    <li><p>Numero Carta: {object[0].numero_carta}</p></li>
                    <li><p>Nominativo: {object[0].nominativo_p}</p></li>
                    <li><p>Data Scadenza: {object[0].data_scadenza}</p></li>
                    <li><p>Codice di Sicurezza: {object[0].codice_sicurezza}</p></li>
                    <Link id="link" to="/aggiorna4" onClick={() => dispatch(scelta('pagamento'))}>Modifica</Link>
                    <br></br>
                    <Link id="link" to='/elimina' onClick={() => dispatch(elimina('pagamento'))}>Rimuovi Metodo Pagamento</Link>
                </ul>
                <ul><h1>Dati patente:</h1>
                    <li><p>Identificativo: {object[0].identificativo}</p></li>
                    <li><p>Nazionalità Patente: {object[0].nazionalità_patente}</p></li>
                    <li><p>Data Rilascio: {object[0].data_rilascio}</p></li>
                    <li><p>Data Scadenza: {object[0].data_scadenza2}</p></li>
                    <li><p>Nominativo: {object[0].nominativo_pat}</p></li>
                    <Link id="link" to="/aggiorna4" onClick={() => dispatch(scelta('patente'))}>Modifica</Link>
                    <br></br>
                    <Link id="link" to='/elimina' onClick={() => dispatch(elimina('patente'))}>Rimuovi Patente</Link>
                </ul>
            </div>
           ); 
        }
        let er = false;
        try {
            if(props.location.state.errore) {
                er = true;
            }
        }
        catch {
            console.log('Nessun problema');
        }
        let errore = er ? (<h1 id="errore">Errore: patente o metodo di pagamento mancante</h1>) : (null)
        return (
            <div id="div5">
                <br></br>
                {errore}
                <br></br>
                <ul><h1>Dati utente:</h1>
                    <li><p>E-mail: {email}</p></li>
                    <li><p>Password: {password}</p></li>
                    <li><p>Cognome e Nome: {object[0].nome}</p></li>
                    <li><p>Genere: {object[0].genere}</p></li>
                    <li><p>Regione: {object[0].regione}</p></li>
                    <li><p>Provincia: {object[0].provincia}</p></li>
                    <li><p>Città: {object[0].comune}</p></li>
                    <li><p>Data di Nascita: {object[0].data_nascita}</p></li>
                    <li><p>Via/Piazza: {object[0].via}</p></li>
                    <li><p>N°: {object[0].numero}</p></li>
                    <li><p>CAP: {object[0].cap}</p></li>
                    <li><p>Località: {object[0].localita}</p></li>
                    <li><p>Telefono: {object[0].telefono}</p></li>
                    <li><p>Tipo: {object[0].tipo}</p></li>
                    <Link id="link" to="/aggiorna4" onClick={() => dispatch(scelta('account'))}>Modifica</Link>
                    <br></br>
                    <Link id="link" to='/elimina' onClick={() => dispatch(elimina('account'))}>Rimuovi Account</Link>
                </ul>
                {scritta}
                {inserisci}
            </div>
        )
    }
    catch {
        return (
            <div>Errore</div>
        )
    } 
}

export default GestioneAccBND;