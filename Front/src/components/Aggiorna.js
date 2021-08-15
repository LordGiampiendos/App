import { aggiornaPrenotazioni, aggiornaPrenotazioniAddettoAllaConsegna, aggiornaPrenotazioniAdmin, aggiornaPrenotazioniAutista } from "./PrenotazioniService";
import { Redirect } from 'react-router';
import { insertOB1 } from "../actions";
import { useSelector, useDispatch } from 'react-redux';

function Aggiorna() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.email);
    const object = useSelector(state => state.OB);
    if(object[0].tipo === 'Admin') {
        const result = aggiornaPrenotazioniAdmin();
        result.then((value) => {
            dispatch(insertOB1(value));
            window.localStorage.setItem("prenotazioni", JSON.stringify(value));
        })
        return(<Redirect to={{
            pathname: "/prenota"}}
        />)   
    }
    else if(object[0].tipo === 'Autista') {
        const result = aggiornaPrenotazioniAutista(object[0].id);
        result.then((value) => {
            dispatch(insertOB1(value));
            window.localStorage.setItem("prenotazioni", JSON.stringify(value));
        })
        return(<Redirect to={{
            pathname: "/prenota"}}
        />)   
    }
    else if(object[0].tipo === 'Addetto alla consegna') {
        const result = aggiornaPrenotazioniAddettoAllaConsegna(object[0].id);
        result.then((value) => {
            dispatch(insertOB1(value));
            window.localStorage.setItem("prenotazioni", JSON.stringify(value));
        })
        return(<Redirect to={{
            pathname: "/prenota"}}
        />)   
    }
    else {
        const result = aggiornaPrenotazioni(email);
        result.then((value) => {
            dispatch(insertOB1(value));
            window.localStorage.setItem("prenotazioni", JSON.stringify(value));
        })
        return(<Redirect to={{
            pathname: "/prenota"}}
        />)   
    }
    
}    

export default Aggiorna;