import React from "react";
import Instagram from './instagram.ico';
import Facebook from './facebook.ico';

function Footer() {
    return (
        <footer>
            <p>CONTATTI:</p>
            <p><a href="tel:0916578980">Numero telefono: 0916578980</a></p>
            <p><a href="tel:+393206038726">Numero cellulare: +393206038726</a></p>
            <p><a href="mailto:8bitCarSharing@email.it">Email: 8bitCarSharing@email.it</a></p>
            <a target="_blank" rel="noreferrer" href="https://it-it.facebook.com/"><img src={Facebook} alt="icona facebook"></img></a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/"><img src={Instagram} alt="icona instagram"></img></a>
        </footer>
    )    
}

export default Footer;