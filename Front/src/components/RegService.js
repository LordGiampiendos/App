import axios from "axios";
import indirizzoIP from "./IP";

export default class RegistrazioneService {
   registrazione(nome, genere, regione, provincia, citta, dataN, indirizzo, N, CAP, localita, telefono, email, password, onSuccess, onError){
      axios.post("http://" + indirizzoIP() + ":4000/users/utenteregistrato", {nome:nome, genere:genere, regione:regione, provincia:provincia, citta:citta, dataN:dataN, indirizzo:indirizzo, N:N, CAP:CAP, localita:localita, telefono:telefono, email:email, password:password}).then(function(result){
         console.log("Registrazione effettuata con successo, token: ", result.data);
         onSuccess(result.data);
      }, function(error){
         console.error("Errore durante la registrazione: ", error.response.data.error);
         onError(error.response.data.error);
      });
   }
   registrazione2(email, numero_carta, nominativo_p, data_scadenza, codice_sicurezza, onSuccess, onError){
      axios.post("http://" + indirizzoIP() + ":4000/users/utenteregistrato2", {email:email, numero_carta:numero_carta, nominativo_p:nominativo_p, data_scadenza:data_scadenza, codice_sicurezza:codice_sicurezza}).then(function(result){
         console.log("Inserimento carta effettuato con successo, token: ", result.data);
         onSuccess(result.data);
      }, function(error){
         console.error("Errore durante l'inserimento della carta...");
         onError(error.response.data.error);
      });
   }
   registrazione3(email, identificativo, nazionalità_patente, data_rilascio, data_scadenza2, nominativo_pat, onSuccess, onError){
      axios.post("http://" + indirizzoIP() + ":4000/users/utenteregistrato3", {email:email, identificativo:identificativo, nazionalità_patente:nazionalità_patente, data_rilascio:data_rilascio, data_scadenza2:data_scadenza2, nominativo_pat:nominativo_pat}).then(function(result){
         console.log("Inserimento patente effettuato con successo, token: ", result.data);
         onSuccess(result.data);
      }, function(error){
         console.error("Errore durante l'inserimento della patente...");
         onError(error.response.data.error);
      });
   }
   registrazione4(nome, genere, regione, provincia, citta, dataN, indirizzo, N, CAP, localita, telefono, email, password, numero_carta, nominativo_p, data_scadenza, codice_sicurezza, identificativo, nazionalità_patente, data_rilascio, data_scadenza2, nominativo_pat, onSuccess, onError){
      axios.post("http://" + indirizzoIP() + ":4000/users/utenteregistrato4", {nome:nome, genere:genere, regione:regione, provincia:provincia, citta:citta, dataN:dataN, indirizzo:indirizzo, N:N, CAP:CAP, localita:localita, telefono:telefono, email:email, password:password, numero_carta:numero_carta, nominativo_p:nominativo_p, data_scadenza:data_scadenza, codice_sicurezza:codice_sicurezza, identificativo:identificativo, nazionalità_patente:nazionalità_patente, data_rilascio:data_rilascio, data_scadenza2:data_scadenza2, nominativo_pat:nominativo_pat}).then(function(result){
         console.log("Registrazione effettuata con successo, token: ", result.data);
         onSuccess(result.data);
      }, function(error){
         console.error("Errore durante la registrazione: ", error.response.data.error);
         onError(error.response.data.error);
      });
   }
   registrazione41(nome, genere, regione, provincia, citta, dataN, indirizzo, N, CAP, localita, telefono, email, password, numero_carta, nominativo_p, data_scadenza, codice_sicurezza, identificativo, nazionalità_patente, data_rilascio, data_scadenza2, nominativo_pat, tipo, onSuccess, onError){
      axios.post("http://" + indirizzoIP() + ":4000/impiegati/impiegatoregistrato", {nome:nome, genere:genere, regione:regione, provincia:provincia, citta:citta, dataN:dataN, indirizzo:indirizzo, N:N, CAP:CAP, localita:localita, telefono:telefono, email:email, password:password, numero_carta:numero_carta, nominativo_p:nominativo_p, data_scadenza:data_scadenza, codice_sicurezza:codice_sicurezza, identificativo:identificativo, nazionalità_patente:nazionalità_patente, data_rilascio:data_rilascio, data_scadenza2:data_scadenza2, nominativo_pat:nominativo_pat, tipo:tipo}).then(function(result){
         console.log("Registrazione effettuata con successo, token: ", result.data);
         onSuccess(result.data);
      }, function(error){
         console.error("Errore durante la registrazione: ", error.response.data.error);
         onError(error.response.data.error);
      });
   }
   registrazione5(nome, genere, regione, provincia, citta, dataN, indirizzo, N, CAP, localita, telefono, email, password, numero_carta, nominativo_p, data_scadenza, codice_sicurezza, onSuccess, onError){
      axios.post("http://" + indirizzoIP() + ":4000/users/utenteregistrato5", {nome:nome, genere:genere, regione:regione, provincia:provincia, citta:citta, dataN:dataN, indirizzo:indirizzo, N:N, CAP:CAP, localita:localita, telefono:telefono, email:email, password:password, numero_carta:numero_carta, nominativo_p:nominativo_p, data_scadenza:data_scadenza, codice_sicurezza:codice_sicurezza}).then(function(result){
         console.log("Registrazione effettuata con successo, token: ", result.data);
         onSuccess(result.data);
      }, function(error){
         console.error("Errore durante la registrazione: ", error.response.data.error);
         onError(error.response.data.error);
      });
   }
   registrazione6(nome, genere, regione, provincia, citta, dataN, indirizzo, N, CAP, localita, telefono, email, password, identificativo, nazionalità_patente, data_rilascio, data_scadenza2, nominativo_pat, onSuccess, onError){
      axios.post("http://" + indirizzoIP() + ":4000/users/utenteregistrato6", {nome:nome, genere:genere, regione:regione, provincia:provincia, citta:citta, dataN:dataN, indirizzo:indirizzo, N:N, CAP:CAP, localita:localita, telefono:telefono, email:email, password:password, identificativo:identificativo, nazionalità_patente:nazionalità_patente, data_rilascio:data_rilascio, data_scadenza2:data_scadenza2, nominativo_pat:nominativo_pat}).then(function(result){
         console.log("Registrazione effettuata con successo, token: ", result.data);
         onSuccess(result.data);
      }, function(error){
         console.error("Errore durante la registrazione: ", error.response.data.error);
         onError(error.response.data.error);
      });
   }
   registrazione7(nome, genere, regione, provincia, citta, dataN, indirizzo, N, CAP, localita, telefono, email, password, emailv, onSuccess, onError){
      axios.post("http://" + indirizzoIP() + ":4000/users/utenteregistrato7", {nome:nome, genere:genere, regione:regione, provincia:provincia, citta:citta, dataN:dataN, indirizzo:indirizzo, N:N, CAP:CAP, localita:localita, telefono:telefono, email:email, password:password, emailv:emailv}).then(function(result){
         console.log("Modifica del profilo effettuata con successo, token: ", result.data);
         onSuccess(result.data);
      }, function(error){
         console.error("Errore durante la modifica del profilo...", error.response.data.error);
         onError(error.response.data.error);
      });
   }
}