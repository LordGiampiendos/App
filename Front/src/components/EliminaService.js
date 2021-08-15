import axios from "axios";
import indirizzoIP from "./IP";

export function elimina1(email){
    axios.post("http://" + indirizzoIP() + ":4000/users/elimina1", {email:email}).then(function(result){
       console.log("Login effettuato con successo, token: ", result.data);
    }, function(error){
       console.error("Errore durante il login: ", error.response.data.slice(104, 122));
    });
}

export function elimina2(email){
    axios.post("http://" + indirizzoIP() + ":4000/users/elimina2", {email:email}).then(function(result){
       console.log("Login effettuato con successo, token: ", result.data);
    }, function(error){
       console.error("Errore durante il login: ", error.response.data.slice(104, 122));
    });
}
export function elimina3(email){
    axios.post("http://" + indirizzoIP() + ":4000/users/elimina3", {email:email}).then(function(result){
       console.log("Login effettuato con successo, token: ", result.data);
    }, function(error){
       console.error("Errore durante il login: ", error.response.data.slice(104, 122));
    });
}