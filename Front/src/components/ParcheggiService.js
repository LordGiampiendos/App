import axios from "axios";
import indirizzoIP from "./IP";

export function inserisciParcheggiAdmin(nome_parcheggio, luogo, orario_apertura, orario_chiusura, onSuccess, onError){
    axios.post("http://" + indirizzoIP() + ":4000/parcheggi/inserisciParcheggiAdmin", {nome_parcheggio:nome_parcheggio, luogo:luogo, orario_apertura:orario_apertura, orario_chiusura:orario_chiusura}).then(function(result){
       console.log("Inserimento parcheggio effettuato con successo, token: ", result.data);
       onSuccess(result.data);
    }, function(error){
       console.error("Errore durante l'inserimento del parcheggio: ", error.response.data.error);
       onError(error.response.data.error);
    });
}

export function aggiornaParcheggiAdmin(){
    let dati = axios.post("http://" + indirizzoIP() + ":4000/parcheggi/aggiornaParcheggiAdmin").then(function(result){
       console.log("Aggiornamento effettuato con successo, token: ", result.data);
       return result.data;
    }, function(error){
       console.error("Errore durante l'aggiornamento: ", error.response.data);
    });
    return dati;
}

export function elimina5(id){
    axios.post("http://" + indirizzoIP() + ":4000/parcheggi/elimina", {id:id}).then(function(result){
       console.log("Cancellazione prenotazione effettuata con successo, token: ", result.data);
    }, function(error){
       console.error("Errore durante la rimozione del parcheggio: ", error.response.data);
    });
}