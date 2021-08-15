import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { logout } from '../actions';
import { elimina1, elimina2, elimina3 } from './EliminaService';
import { elimina5 } from './ParcheggiService';
import { elimina, elimina41, rilascia, rilasciaL } from './PrenotazioniService';
import { elimina6 } from './ImpiegatoService';

export default function Elimina() {
    let svuota = '';
    const scelta = useSelector(state => state.E);
    const email = useSelector(state => state.email);
    const object = useSelector(state => state.OB);
    const id = useSelector(state => state.ID);
    const dispatch = useDispatch();
    if(scelta === 'account') {
        elimina1(email);
        dispatch(logout());
        return(<Redirect to={{
            pathname: "/applica"}}
        />)
    }
    if(scelta === 'patente') {
        elimina3(email);
        object[0].identificativo = svuota;
        object[0].naz_patente = svuota;
        object[0].data_rilascio = svuota;
        object[0].data_scadenza2 = svuota;
        object[0].nominativo_pat = svuota;
        return(<Redirect to={{
            pathname: "/account"}}
        />)
    }
    if(scelta === 'pagamento') {
        elimina2(email);
        object[0].numero_carta = svuota;
        object[0].nominativo_p = svuota;
        object[0].data_scadenza = svuota;
        object[0].codice_sicurezza = svuota;
        return(<Redirect to={{
            pathname: "/account"}}
        />)
    }
    if(scelta === 'prenotazione') {
        if(object[0].tipo === 'Cliente') {
            elimina(email, id);
        }
        else {
            elimina41(id);
        }    
        return(<Redirect to={{
            pathname: "/account"}}
        />)
    }
    if(scelta === 'rilascia') {
        rilascia(email, id);
        return(<Redirect to={{
            pathname: "/account"}}
        />)
    }
    if(scelta === 'rilasciaL') {
        rilasciaL(id);
        return(<Redirect to={{
            pathname: "/account"}}
        />)
    }
    if(scelta === 'parcheggio') {
        elimina5(id);
        return(<Redirect to={{
            pathname: "/account"}}
        />)
    }
    if(scelta === 'impiegato') {
        elimina6(id);
        return(<Redirect to={{
            pathname: "/account"}}
        />)
    }
}