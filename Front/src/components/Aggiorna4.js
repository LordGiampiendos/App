import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

function Aggiorna4() {
    const sceltaD = useSelector(state => state.SC);
    const email = useSelector(state => state.email);
    const id = useSelector(state => state.ID);
    const modello = useSelector(state => state.MOD);
    const menuVisible = useSelector(state => state.L);
    const prezzo = useSelector(state => state.P);
    const object = useSelector(state => state.OB);
    const DI = useSelector(state => state.DI);
    const OI = useSelector(state => state.OI);
    const C = useSelector(state => state.C);
    if(sceltaD === 'account') {
        return(<Redirect to={{
            pathname: "/modifica",
            state: {
                email:email
            }}}
        />)
    }
    else if(sceltaD === 'pagamento') {
        return(<Redirect to={{
            pathname: "/modifica1",
            state: {
                email:email
            }}}
        />)
    }
    else if(sceltaD === 'patente') {
        return(<Redirect to={{
            pathname: "/modifica2",
            state: {
                email:email
            }}}
        />)
    }
    else if(sceltaD === 'noleggia') {
        if(menuVisible && object[0].tipo === 'Cliente') {
            if(!object[0].numero_carta) {
                return(<Redirect to={{
                    pathname: "/account",
                    state: {
                        errore: true
                    }}}/>)
            }
            else {
                return(<Redirect to={{
                    pathname: "/insPrenotazione",
                    state: {
                        email:email,
                        modello:modello,
                        prezzo:prezzo,
                        patente:object[0].identificativo,
                        carta:object[0].numero_carta
                    }}}
                />)
            }
        }
        else if(!menuVisible) {
            return(<Redirect to={{pathname: "/login"}}/>)
        } 
        else {
            return(<Redirect to={{pathname: "/account"}}/>)
        }   
    }
    else if(sceltaD === 'ritardo') {
        return(<Redirect to={{
            pathname: "/ritardo",
            state: {
                email:email,
                modello:modello,
                id: id,
                DI: DI,
                OI: OI,
                costo: C
            }}}
        />)

    }
    else {
        console.log('Nessuna scelta');
    }
}

export default Aggiorna4;