import axios from "axios";
import indirizzoIP from "./IP";

export function elimina6(id){
    axios.post("http://" + indirizzoIP() + ":4000/impiegati/elimina", {id:id}).then(function(result){
       console.log("Eliminazione impiegato effettuata con successo, token: ", result.data);
    }, function(error){
       console.error("Errore durante l'eliminazione: ", error.response.data);
    });
}

export function aggiornaImpiegatiAdmin(){
    let dati = axios.post("http://" + indirizzoIP() + ":4000/impiegati/aggiornaImpiegatiAdmin").then(function(result){
       console.log("Aggiornamento effettuato con successo, token: ", result.data);
       return result.data;
    }, function(error){
       console.error("Errore durante l'aggiornamento: ", error.response.data);
    });
    return dati;
}

export function aggiornaAutisti(){
   let dati = axios.post("http://" + indirizzoIP() + ":4000/impiegati/aggiornaAutisti").then(function(result){
      console.log("Aggiornamento effettuato con successo, token: ", result.data);
      return result.data;
   }, function(error){
      console.error("Errore durante l'aggiornamento: ", error.response.data);
   });
   return dati;
}

export function aggiornaAddetti(){
   let dati = axios.post("http://" + indirizzoIP() + ":4000/impiegati/aggiornaAddetti").then(function(result){
      console.log("Aggiornamento effettuato con successo, token: ", result.data);
      return result.data;
   }, function(error){
      console.error("Errore durante l'aggiornamento ", error.response.data);
   });
   return dati;
}
