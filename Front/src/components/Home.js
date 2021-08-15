import React, {Component} from 'react';
import car1 from './Car-Sharing.jpg';

class Home extends Component {
    render() {
        return (
            <figure>
                <p id="p1">Massima professionalità e competenza.</p>
                <p id="p2">Noi offriamo un servizio di mobilità urbana che permette agli utenti di utilizzare un veicolo su prenotazione noleggiandolo per un periodo di tempo breve, nell'ordine di minuti od ore, e pagando in ragione dell'utilizzo effettuato. Al momento del noleggio, l'utente verifica la presenza del tipo di veicolo preferito nei parcheggi più vicini, e lo prenota fissando da subito un periodo di utilizzo, tipicamente di una o più ore. Tale periodo potrà essere esteso successivamente come sarà anche possibile riconsegnare il veicolo in anticipo rispetto al tempo prenotato. Può essere prevista una carta elettronica che abiliti l'apertura del veicolo. Il veicolo dovrà essere riconsegnato nello stesso parcheggio di partenza.<br/><img id="img1" src={car1} alt="Immagine Car-Sharing"/></p>
            </figure>
        )
    }
}

export default Home;