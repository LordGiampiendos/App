import React from "react";
import Home from "./Home";
import VeicoliBND from "./VeicoliBND";
import RegistrazioneFORM from "./RegistrazioneFORM";
import { Router, Route, Link } from "react-router-dom";
import PulsantiAccesso from "./PulsantiAccesso";
import GestioneAccBND from "./GestioneAccBND";
import DettagliPrenotazione from "./DettagliPrenotazione";
import AccountFORM from "./AccountFORM";
import PagamentoFORM from "./PagamentoFORM";
import PatenteFORM from "./PatenteFORM";
import AutomobiliBND from "./AutomobiliBND";
import MotocicliBND from "./MotocicliBND";
import BicicletteBND from "./BicicletteBND";
import MonopattiniBND from "./MonopattiniBND";
import SpecificheBND1 from './SpecificheBND1';
import SpecificheBND2 from './SpecificheBND2';
import SpecificheBND3 from './SpecificheBND3';
import SpecificheBND4 from './SpecificheBND4';
import SpecificheBND5 from './SpecificheBND5';
import SpecificheBND6 from './SpecificheBND6';
import SpecificheBND7 from './SpecificheBND7';
import SpecificheBND8 from './SpecificheBND8';
import SpecificheBND9 from './SpecificheBND9';
import SpecificheBND10 from './SpecificheBND10';
import SpecificheBND11 from './SpecificheBND11';
import SpecificheBND12 from './SpecificheBND12';
import { createHashHistory } from 'history';
import casa from './casa.ico';
import mac from './mac.ico';
import auto from './auto.ico';
import moto from './moto.ico';
import bici from './bici.ico';
import scooter from './scooter.ico';
import freccia from './freccia.ico';
import account from './account.ico';
import accedi from './accedi.ico';
import disconnetti from './disconnetti.ico';
import lista from './lista.ico';
import Applica from "./applica";
import Elimina from "./Elimina";
import ImpiegatoFORM from "./ImpiegatoFORM";
import Aggiorna from "./Aggiorna";
import ListaPar from "./ListaPar";
import Aggiorna2 from "./Aggiorna2";
import modifica from "./modifica.ico";
import modificaI from "./impiegato.ico";
import modificaP from "./parcheggio.ico";
import NoleggiaBND from "./NoleggiaBND";
import ParcheggioFORM from "./ParcheggioFORM";
import ListaImp from "./ListaImp";
import Aggiorna3 from "./Aggiorna3";
import Aggiorna4 from "./Aggiorna4";
import RitardoBND from "./RitardoBND";
import Recupero from "./Password";
import { logout, untext, text, dim, undim, vis, vis1, unadmin, successo } from "../actions/index";
import { useDispatch, useSelector } from 'react-redux';

const customHistory = createHashHistory();

function Navbar() {
    const menuVisible = useSelector(state => state.L);
    const dime = useSelector(state => state.D);
    const dispatch = useDispatch();
    const textVisible = useSelector(state => state.T);
    const administrator = useSelector(state => state.A);
    const fr = useSelector(state => state.F);
    const fr1 = useSelector(state => state.F1);
    const fr2 = useSelector(state => state.MO);
    /* Menù laterale */
    var sottomenuS = fr ? (
        <ul>
            <br></br>
            <li><img src={auto} alt="icona auto"/><Link to="/ricerca1">Catalogo Auto</Link></li>
            <li><img src={moto} alt="icona moto"/><Link to="/ricerca2">Catalogo Moto</Link></li>
            <li><img src={bici} alt="icona bici"/><Link to="/ricerca3">Catalogo Bici</Link></li>
            <li><img src={scooter} alt="icona scooter"/><Link to="/ricerca4">Catalogo Monopattini</Link></li>
        </ul>) : (null)
    var sottomenuS4 = fr2 ? (
        <ul>
            <li><img src={modificaI} alt="icona modificaI"/><Link to="/aggiorna3">Modifica Impiegato</Link></li>
            <li><img src={modificaP} alt="icona modificaP"/><Link to="/aggiorna2">Modifica Parcheggi</Link></li>
        </ul>) : (null)
    var sottomenuS3 = administrator ? (
        <div>
            <li><img src={lista} alt="icona lista"/><Link to="/aggiorna">Lista Prenotazioni</Link></li>
            <li><img src={disconnetti} alt="icona disconnetti"/><Link to="/applica" onClick={() => {dispatch(logout()); dispatch(unadmin())}}>Disconnetti</Link></li>
            <li><img src={modifica} alt="icona modifica"/><p onClick={() => dispatch(successo())}>Modifica Sistema</p>
            {sottomenuS4}
            </li>
        </div>) : (
            <ul>
                <li><img src={lista} alt="icona lista"/><Link to="/aggiorna">Lista Prenotazioni</Link></li>
                <li><img src={disconnetti} alt="icona disconnetti"/><Link to="/login" onClick={() => dispatch(logout())}>Disconnetti</Link></li>
            </ul>)
    var sottomenuS1 = fr1 ? (
        <div>
            {sottomenuS3}
        </div>) : (null)
    var sottomenuS2 = fr1 ? (
        <ul>
            <li><img src={accedi} alt="icona accedi"/><Link to="/login">Autenticati</Link></li>
        </ul>) : (null)
    var sottomenu2 = menuVisible ? (
        <li><img src={account} alt="icona account"/><Link to="/account">Gestione Account</Link><img id="imgf" onClick={() => dispatch(vis1())} src={freccia} alt="icona freccia"/>
            {sottomenuS1}  
        </li>) : ( 
            <li><img src={account} alt="icona account"/><Link to="/login">Gestione Account</Link><img id="imgf" onClick={() => dispatch(vis1())} src={freccia} alt="icona freccia"/>
                {sottomenuS2}  
            </li>)    
    var dimensione = dime ? (
        <ul id="side" className="sidebar">
            <li className="closebtn"><p onClick={() => dispatch(undim())}>×</p></li>
            <li>
                <img src={casa} alt="icona casa"/><Link to="/">Home</Link>
            </li>
            <li onMouseOver={() => dispatch(text())} onMouseOut={() => dispatch(untext())}>
                <img src={mac} alt="icona macchina"/><Link to="/ricerca">Visita</Link><img id="imgf" onClick={() => dispatch(vis())} src={freccia} alt="icona freccia"/>
                {sottomenuS}  
            </li>
            <br></br>
            {sottomenu2}
        </ul>) : (null)
    /* Menù navigazione */
    var adminR = administrator ? (
        <div>
            <li id="li8"><Link to="/aggiorna">Lista Prenotazioni</Link></li>
            <li id="li9"><Link to="/applica" onClick={() => {dispatch(logout()); dispatch(unadmin())}}>Disconnetti</Link></li>
            <li id="li11" className="submenu li2">Modifica Sistema
                <ul id="spo">
                  <li id="lispo1"><Link to="/aggiorna3">Modifica Impiegato</Link></li>
                  <li id="lispo2"><Link to="/aggiorna2">Modifica Parcheggi</Link></li>
                </ul>
            </li>
        </div>) : (
            <div>
                <li id="li8"><Link to="/aggiorna">Lista Prenotazioni</Link></li>
                <li id="li9"><Link to="/applica" onClick={() => dispatch(logout())}>Disconnetti</Link></li>
            </div>)
    var disc = menuVisible ? (
        <li className="submenu li3"><Link to="/account">Gestione Account</Link>
            <ul>
                {adminR}
            </ul>
        </li>) : ( 
            <li className="submenu li3"><Link to="/login">Gestione Account</Link>
                <ul>
                    <li id="li8"><Link to="/login">Autenticati</Link></li>
                </ul>
            </li>)    
    var sottomenu = textVisible ? (<li className="submenu li3"><a href="null">^^</a></li>) : (<div>{disc}</div>)
    return (
    <div>
        <Router history={customHistory}>
            <button className="openbtn" onClick={() => dispatch(dim())}>☰</button>
            {dimensione} 
            <ul id="ul1" className="menu hide">
                <li className="submenu li1">
                    <Link to="/">Home</Link>
                </li>
                <li className="submenu li2" onMouseOver={() => dispatch(text())} onMouseOut={() => dispatch(untext())}>
                    <Link to="/ricerca">Visita</Link>
                    <ul>
                        <li id="li4"><Link to="/ricerca1">Catalogo Auto</Link></li>
                        <li id="li5"><Link to="/ricerca2">Catalogo Moto</Link></li>
                        <li id="li6"><Link to="/ricerca3">Catalogo Bici</Link></li>
                        <li id="li7"><Link to="/ricerca4">Catalogo Monopattini</Link></li>
                    </ul>
                </li>
                {sottomenu}
            </ul>   
            <Route exact path="/" component={Home}/>
            <Route exact path="/ricerca" component={VeicoliBND}/>
            <Route exact path="/registrazione" component={RegistrazioneFORM}/>
            <Route exact path="/login" component={PulsantiAccesso}/>
            <Route exact path="/account" component={GestioneAccBND}/>
            <Route exact path="/prenota" component={DettagliPrenotazione}/>
            <Route exact path="/modifica" component={AccountFORM}/>
            <Route exact path="/modifica1" component={PagamentoFORM}/>
            <Route exact path="/modifica2" component={PatenteFORM}/>
            <Route exact path="/ricerca1" component={AutomobiliBND}/>
            <Route exact path="/ricerca2" component={MotocicliBND}/>
            <Route exact path="/ricerca3" component={BicicletteBND}/>
            <Route exact path="/ricerca4" component={MonopattiniBND}/>
            <Route exact path="/prenota1" component={SpecificheBND1}/>
            <Route exact path="/prenota2" component={SpecificheBND2}/>
            <Route exact path="/prenota3" component={SpecificheBND3}/>
            <Route exact path="/prenota4" component={SpecificheBND4}/>
            <Route exact path="/prenota5" component={SpecificheBND5}/>
            <Route exact path="/prenota6" component={SpecificheBND6}/>
            <Route exact path="/prenota7" component={SpecificheBND7}/>
            <Route exact path="/prenota8" component={SpecificheBND8}/>
            <Route exact path="/prenota9" component={SpecificheBND9}/>
            <Route exact path="/prenota10" component={SpecificheBND10}/>
            <Route exact path="/prenota11" component={SpecificheBND11}/>
            <Route exact path="/prenota12" component={SpecificheBND12}/>
            <Route exact path="/applica" component={Applica}/>
            <Route exact path="/elimina" component={Elimina}/>
            <Route exact path="/registrazioneA" component={ImpiegatoFORM}/>
            <Route exact path="/aggiorna" component={Aggiorna}/>
            <Route exact path="/parcheggi" component={ListaPar}/>
            <Route exact path="/aggiorna2" component={Aggiorna2}/>
            <Route exact path="/insPrenotazione" component={NoleggiaBND}/>
            <Route exact path="/insParcheggio" component={ParcheggioFORM}/>
            <Route exact path="/impiegati" component={ListaImp}/>
            <Route exact path="/aggiorna3" component={Aggiorna3}/>
            <Route exact path="/aggiorna4" component={Aggiorna4}/>
            <Route exact path="/ritardo" component={RitardoBND}/>
            <Route exact path="/password" component={Recupero}/>
            </Router>
    </div>    
    )
}

export default Navbar;