import axios from "axios";
import indirizzoIP from "./IP";

export function insPrenotazioni(email, data_noleggio_iniziale, orario_noleggio_iniziale, data_noleggio_finale, orario_noleggio_finale, luogo_rilascio_ritiro, modello, presenza_autista, id_autista, id_addetto, destinazione, numero_carta, costo_prenotazione, onSuccess, onError){
    axios.post("http://" + indirizzoIP() + ":4000/prenotazioni/insPrenotazioni", {email:email, data_noleggio_iniziale:data_noleggio_iniziale, orario_noleggio_iniziale:orario_noleggio_iniziale,data_noleggio_finale:data_noleggio_finale, orario_noleggio_finale:orario_noleggio_finale, luogo_rilascio_ritiro:luogo_rilascio_ritiro, modello:modello, presenza_autista:presenza_autista, id_autista:id_autista, id_addetto:id_addetto, destinazione:destinazione, numero_carta:numero_carta, costo_prenotazione}).then(function(result){
       console.log("Inserimento prenotazione effettuato con successo, token: ", result.data);
       onSuccess(result.data);
    }, function(error){
       console.error("Errore durante la prenotazione: ", error.response.data.error);
       onError(error.response.data.error);
    });
}

export function ritPrenotazioni(email, id, data_noleggio_finale, orario_noleggio_finale, destinazione, restituito, costo_prenotazione, onSuccess, onError){
   axios.post("http://" + indirizzoIP() + ":4000/prenotazioni/ritPrenotazioni", {email:email, id:id, data_noleggio_finale:data_noleggio_finale, orario_noleggio_finale:orario_noleggio_finale, destinazione:destinazione, restituito:restituito, costo_prenotazione:costo_prenotazione}).then(function(result){
      console.log("Inserimento prenotazione effettuato con successo, token: ", result.data);
      onSuccess(result.data);
   }, function(error){
      console.error("Errore durante la prenotazione: ", error.response.data.error);
      onError(error.response.data.error);
   });
}

export function aggiornaPrenotazioni(email){
    let dati = axios.post("http://" + indirizzoIP() + ":4000/prenotazioni/aggiornaPrenotazioni", {email:email}).then(function(result){
       console.log("Aggiornamento effettuato con successo, token: ", result.data);
       return result.data;
    }, function(error){
       console.error("Errore durante la prenotazione: ", error.response.data.error);
    });
    return dati;
}

export function elimina(email, id){
    axios.post("http://" + indirizzoIP() + ":4000/prenotazioni/elimina", {email:email, id:id}).then(function(result){
       console.log("Cancellazione prenotazione effettuata con successo, token: ", result.data);
    }, function(error){
       console.error("Errore durante la prenotazione: ", error.response.data.error);
    });
}

export function rilascia(email, id){
   axios.post("http://" + indirizzoIP() + ":4000/prenotazioni/rilascia", {email:email, id:id}).then(function(result){
      console.log("Cancellazione prenotazione effettuata con successo, token: ", result.data);
   }, function(error){
      console.error("Errore durante la prenotazione: ", error.response.data.error);
   });
}

export function rilasciaL(id){
   axios.post("http://" + indirizzoIP() + ":4000/prenotazioni/rilasciaL", {id:id}).then(function(result){
      console.log("Cancellazione prenotazione effettuata con successo, token: ", result.data);
   }, function(error){
      console.error("Errore durante la prenotazione: ", error.response.data.error);
   });
}

export function aggiornaPrenotazioniAdmin(){
   let dati = axios.post("http://" + indirizzoIP() + ":4000/prenotazioni/aggiornaPrenotazioniAdmin").then(function(result){
      console.log("Aggiornamento effettuato con successo, token: ", result.data);
      return result.data;
   }, function(error){
      console.error("Errore durante la prenotazione: ", error.response.data.error);
   });
   return dati;
}

export function aggiornaPrenotazioniAutista(id_autista){
   let dati = axios.post("http://" + indirizzoIP() + ":4000/prenotazioni/aggiornaPrenotazioniAutista", {id_autista:id_autista}).then(function(result){
      console.log("Aggiornamento effettuato con successo, token: ", result.data);
      return result.data;
   }, function(error){
      console.error("Errore durante la prenotazione: ", error.response.data.error);
   });
   return dati;
}

export function aggiornaPrenotazioniAddettoAllaConsegna(id_addetto){
   let dati = axios.post("http://" + indirizzoIP() + ":4000/prenotazioni/aggiornaPrenotazioniAddettoAllaConsegna", {id_addetto:id_addetto}).then(function(result){
      console.log("Aggiornamento effettuato con successo, token: ", result.data);
      return result.data;
   }, function(error){
      console.error("Errore durante la prenotazione: ", error.response.data.error);
   });
   return dati;
}

export function elimina41(id){
   axios.post("http://" + indirizzoIP() + ":4000/prenotazioni/elimina1", {id:id}).then(function(result){
      console.log("Cancellazione prenotazione effettuata con successo, token: ", result.data);
   }, function(error){
      console.error("Errore durante la prenotazione: ", error.response.data.slice(104, 122));
   });
}