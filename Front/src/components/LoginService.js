import axios from "axios";
import indirizzoIP from "./IP";
axios.defaults.withCredentials = true;

export default class LoginService {
   login(email, password, onSuccess, onError){
      axios.post("http://" + indirizzoIP() + ":4000/users/login", {email:email, password:password}, {withCredentials: true}).then(function(result){
         console.log("Login effettuato con successo, token: ", result.data);   
         onSuccess(result.data);
      }, function(error){
         console.error("Errore durante il login: ", error.response.data.error);
         onError(error.response.data.error);
      });
   }
   recupero(email, onSuccess, onError){
      axios.post("http://" + indirizzoIP() + ":4000/users/recupero", {email:email}).then(function(result){
         console.log("Recupero effettuato con successo, token: ", result.data.error);
         onSuccess(result.data);
      }, function(error){
         console.error("Errore durante il recupero: ", error.response.error);
         onError(error.response.data);
      });
   }
}