import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertP, insertU } from '../actions';
import { Redirect } from 'react-router';

function Applica(props) {
    const menuVisible = useSelector(state => state.L);
    const object = useSelector(state => state.OB);
    const email = useSelector(state => state.email);
    const password = useSelector(state => state.password);
    const dispatch = useDispatch();
    if(!menuVisible) {
        let svuota = '';
        dispatch(insertU(svuota));
        dispatch(insertP(svuota));
        if(!menuVisible) {
            window.localStorage.removeItem("utente");
            window.localStorage.removeItem("email");
            window.localStorage.removeItem("password");
            window.localStorage.removeItem("prenotazioni");
        }  
        return(<Redirect to={{
            pathname: "/login"}}
        />)
    }
    try {
        if(typeof props.location.state.email !== 'undefined') {
            dispatch(insertU(props.location.state.email));
            dispatch(insertP(props.location.state.password));
            object[0].nome = props.location.state.nome;
            object[0].genere = props.location.state.genere;
            object[0].regione = props.location.state.regione;
            object[0].provincia = props.location.state.provincia;
            object[0].comune = props.location.state.citta;
            object[0].data_nascita = props.location.state.dataN;
            object[0].via = props.location.state.indirizzo;
            object[0].numero = props.location.state.N;
            object[0].cap = props.location.state.CAP;
            object[0].localita = props.location.state.localita;
            object[0].telefono = props.location.state.telefono;
            object[0].tipo = props.location.state.tipo;
            window.localStorage.setItem("utente", JSON.stringify(object));
            window.localStorage.setItem("email", JSON.stringify(email));
            window.localStorage.setItem("password", JSON.stringify(password));
            return(<Redirect to={{
                pathname: "/account"}}
            />)
        }
    }
    catch {
        console.log('Nessun problema');
    }
    try {
        if(typeof props.location.state.numero_carta !== 'undefined') {
            object[0].numero_carta = props.location.state.numero_carta;
            object[0].nominativo_p = props.location.state.nominativo_p;
            object[0].data_scadenza = props.location.state.data_scadenza;
            object[0].codice_sicurezza = props.location.state.codice_sicurezza;
            window.localStorage.setItem("utente", JSON.stringify(object));
            window.localStorage.setItem("email", JSON.stringify(email));
            window.localStorage.setItem("password", JSON.stringify(password));
            return(<Redirect to={{
                pathname: "/account"}}
            />)
        }
    }
    catch {
        console.log('Nessun problema');
    }
    try {
        if(typeof props.location.state.identificativo !== 'undefined') {
            object[0].identificativo = props.location.state.identificativo;
            object[0].naz_patente = props.location.state.nazionalità_patente;
            object[0].data_rilascio = props.location.state.data_rilascio;
            object[0].data_scadenza2 = props.location.state.data_scadenza2;
            object[0].nominativo_pat = props.location.state.nominativo_pat;
            window.localStorage.setItem("utente", JSON.stringify(object));
            window.localStorage.setItem("email", JSON.stringify(email));
            window.localStorage.setItem("password", JSON.stringify(password));
            return(<Redirect to={{
                pathname: "/account"}}
            />)
        }
    }
    catch {
        console.log('Nessun problema');
    }
}

export default Applica;