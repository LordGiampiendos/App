import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import { aggiornaParcheggiAdmin } from './ParcheggiService';
import { insertOB2 } from "../actions";

function Aggiorna2() {
    const dispatch = useDispatch();
    const result = aggiornaParcheggiAdmin();
    result.then((value) => {
        dispatch(insertOB2(value));
        window.localStorage.setItem("parcheggi", JSON.stringify(value));
    })
    return(<Redirect to={{
        pathname: "/parcheggi"}}
    />)   
}

export default Aggiorna2;
