import React, { useEffect } from "react";
import './components/stile.css';
import { useDispatch, useSelector } from 'react-redux';
import { insertOB, insertP, insertU, login, admin, insertOB1, insertOB2, insertOB3 } from "./actions/index";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Notifica from "./components/notifica.";
import Header from "./components/header";

const App = () => {
  const dime = useSelector(state => state.D);
  const dispatch = useDispatch();
 
  useEffect(() => {
    let dati = JSON.parse(window.localStorage.getItem("utente"));
    let dati2 = JSON.parse(window.localStorage.getItem("email"));
    let dati3 = JSON.parse(window.localStorage.getItem("password"));
    let dati4 = JSON.parse(window.localStorage.getItem("prenotazioni"));
    let dati5 = JSON.parse(window.localStorage.getItem("parcheggi"));
    let dati6 = JSON.parse(window.localStorage.getItem("impiegati"));
    if(dati) {
      dispatch(insertOB(dati));
      dispatch(insertU(dati2));
      dispatch(insertP(dati3));
      if(dati4) {
        dispatch(insertOB1(dati4));
      }
      if(dati5) {
        dispatch(insertOB2(dati5));
      } 
      if(dati6) {
        dispatch(insertOB3(dati6));
      } 
      dispatch(login());
      try {
        if(dati[0].tipo === "Admin") {
          dispatch(admin());
        }
      }
      catch {
        console.log('Non presente');
      }  
    }
  }, [])
  /* Effetto comparsa */  
  var stile = dime ? ("main1") : ("main")
  return (
        <div id={stile}>
          <Notifica />
          <Header />
          <Navbar />
          <Footer />
        </div>
    );
}

export default App;