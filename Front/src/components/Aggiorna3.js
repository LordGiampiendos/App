import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import { insertOB3 } from "../actions";
import { aggiornaImpiegatiAdmin } from './ImpiegatoService';

function Aggiorna3() {
    const dispatch = useDispatch();
    const result = aggiornaImpiegatiAdmin();
    result.then((value) => {
        dispatch(insertOB3(value));
        window.localStorage.setItem("impiegati", JSON.stringify(value));
    })
    return(<Redirect to={{
        pathname: "/impiegati"}}
    />)   
}

export default Aggiorna3;
