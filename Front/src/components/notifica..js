import React from "react";
import notifica from "./notifica.ico";
import $ from 'jquery';
import indirizzoIP from "./IP";
import { mostra } from "../actions/index";
import { useDispatch, useSelector } from 'react-redux';

function Notifica() {
    const menuVisible = useSelector(state => state.L);
    const mostraN = useSelector(state => state.M);
    const object = useSelector(state => state.OB);
    const dispatch = useDispatch();
    /* Notifiche */
    try {
        var msg = $.ajax({type: "GET", url: "http://" + indirizzoIP() + ":4000/notifiche/aggiornaNotificheAdmin", async: false}).responseJSON;
    }
    catch {
        console.log('Riprovo');
    }
    if(menuVisible) {
        const stampa = msg.map(function(objectS) {
        if(object[0].tipo === 'Admin' && msg.length !== 0) {
            return (
                <p>Notifica:{objectS.notifica} Id_utente:{objectS.id_utente}</p>
            )
        }
        else if(objectS.id_utente === object[0].id && msg.length !== 0) {
            return (
                <p>{objectS.notifica}</p>
            )
        }
        else {
            return (
                <p>Nessuna notifica</p>
            )
        }  
    })
    var notifiche = mostraN ? (<div id="divN">{stampa}</div>) : (null)
    var notificheP = menuVisible ? (
        <div>
            <img id="notifiche" src={notifica} alt="immagine notifica" onClick={() => dispatch(mostra())}/>
            {notifiche}
        </div>) : (null)
    }
    return (
        <div>
            {notificheP}
        </div>    
    )  
}

export default Notifica;