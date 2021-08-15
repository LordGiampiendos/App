import React, {Component} from 'react';
import $ from 'jquery';
import dati from './regioni_province_comuni.json';
import RegistrazioneService from './RegService';
import { Redirect } from 'react-router';

class ImpiegatoFORM extends Component {
    constructor(props){
        super(props);
        this.state = {
           email: '',
           password: '',
           nome: '',
           genere: '',
           regione: '',
           provincia: '',
           citta: '',
           dataN: '',
           indirizzo: '',
           N: '',
           CAP: '',
           localita: '',
           telefono: '',
           numero_carta: '', 
           nominativo_p: '',
           data_scadenza: '', 
           codice_sicurezza: '', 
           identificativo: '', 
           nazionalità_patente: '', 
           data_rilascio: '', 
           data_scadenza2: '', 
           nominativo_pat: '',
           tipo: '',
           showSuccess:false,
           showError:false,
           errorMessage:"",
           successMessage:""
        }
        this.RegistrazioneService = new RegistrazioneService();
    }
    changeText(field, event){
        this.setState({[field]:event.target.value});
    }
    selF(field, event) {
        this.setState({[field]:event.target.options[event.target.selectedIndex].text});
    }
    onSubmit(event){
        event.preventDefault();
    }
    registrazione(event){
        this.RegistrazioneService.registrazione41(this.state.nome, 
                                                  this.state.genere,
                                                  this.state.regione,
                                                  this.state.provincia,
                                                  this.state.citta,
                                                  this.state.dataN,
                                                  this.state.indirizzo,
                                                  this.state.N,
                                                  this.state.CAP,
                                                  this.state.localita,
                                                  this.state.telefono,
                                                  this.state.email,
                                                  this.state.password,
                                                  this.state.numero_carta, 
                                                  this.state.nominativo_p, 
                                                  this.state.data_scadenza, 
                                                  this.state.codice_sicurezza, 
                                                  this.state.identificativo, 
                                                  this.state.nazionalità_patente, 
                                                  this.state.data_rilascio, 
                                                  this.state.data_scadenza2, 
                                                  this.state.nominativo_pat,
                                                  this.state.tipo,
                                                  this.regSuccess.bind(this),
                                                  this.regError.bind(this)
                                                  )    
    }
    regSuccess(dataResult){
        this.setState({
                       showSuccess:true, 
                       successMessage:"Registrazione effettuata",
                       showError:false,
                       errorMessage:""});      
     }
    regError(errorData){
        this.setState({
                       showError:true, 
                       errorMessage:"Errore durante la registrazione: " + errorData,
                       showSuccess:false,
                       successMessage:""});
    }
    getSuccessMessage(){
        if(this.state.showSuccess){
           return (
              <div style={{color:"green", position: "relative", top: "-18px", left: "30px"}}>
                 {this.state.successMessage}
              </div>    
           );
        }else{
          return (
              <div></div>
          );
        }
    }
    getErrorMessage(){
        if(this.state.showError){
            return (
              <div style={{color:"red", position: "relative", top: "-18px", left: "30px"}}>
                  {this.state.errorMessage}
              </div>
            );
        }else{
           return (
              <div></div>
           );
        }
    }
    componentDidMount() {
        $(document).ready(function() {
            const strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}");

            let province = null;

            $('#address').focusout(function(ev) {
                if ($(this).val() !== '') {
                    $('.form-row input').not('#address').removeAttr('disabled');
                    $('.form-row input').not('#address').attr('required', 'required');
                } else {
                    $('.form-row input').not('#address').attr('disabled', 'disabled');
                    $('.form-row input').not('#address').removeAttr('required');
                }
            }).keydown(function(ev) {
                if (ev.keyCode === 9) { 
                    if ($(this).val() !== '') {
                        $('.form-row input').not('#address').removeAttr('disabled');
                        $('.form-row input').not('#address').attr('required', 'required');
                    } else {
                        $('.form-row input').not('#address').attr('disabled', 'disabled');
                        $('.form-row input').not('#address').removeAttr('required');
                    }
                }
            });

            $('#numberpaper').focusout(function(ev) {
                if ($(this).val() !== '') {
                    $('.form-m input').not('#numberpaper').removeAttr('disabled');
                    $('.form-m input').not('#numberpaper').attr('required', 'required');
                } else {
                    $('.form-m input').not('#numberpaper').attr('disabled', 'disabled');
                    $('.form-m input').not('#numberpaper').removeAttr('required');
                }
            }).keydown(function(ev) {
                if (ev.keyCode === 9) { 
                    if ($(this).val() !== '') {
                        $('.form-m input').not('#numberpaper').removeAttr('disabled');
                        $('.form-m input').not('#numberpaper').attr('required', 'required');
                    } else {
                        $('.form-m input').not('#numberpaper').attr('disabled', 'disabled');
                        $('.form-m input').not('#numberpaper').removeAttr('required');
                    }
                }
            });

            $('#repass').change(function(ev) {
                if ($(this).val() !== $('#pass').val()) {
                    $(this).val('').attr('placeholder', 'Password non coincidenti!').focus();
                }
            });

            $('#pass').on('input', function(ev) {

                if (strongPass.test($(this).val()))
                    $(this).siblings('.valid-feedback').removeClass('text-warning').text('Password forte');
                else
                    $(this).siblings('.valid-feedback').addClass('text-warning').text('Password media');
            });

            $('#region').change(function(ev) {

                $('#state').html('<option value="" selected></option>');
                $('#town').html('<option value="" selected></option>');

                if ($(this).val() !== '') {
                    province = dati.regioni[Number.parseInt($(this).val())].province;

                    for (let provincia of province) {
                        $(document.createElement('option')).val(provincia.code).text(provincia.nome).appendTo('#state');
                    }
                }
            });

            $('#state').change(function(ev) {

                $('#town').html('<option value="" selected></option>');

                if ($(this).val() !== '') {

                    for (let provincia of province) {
                        if (provincia.code === $('#state').val()) {
                            for (let comune of provincia.comuni) {
                                $(document.createElement('option')).val(comune.cap).text(comune.nome).appendTo('#town');
                            }
                            break;
                        }
                    }
                }
            });
        });
    }

    render() {
        var successMessage = this.getSuccessMessage();
        var errorMessage = this.getErrorMessage();
        if(this.state.showSuccess) {
            return <Redirect to={{pathname:"/account"}}/>; 
        }
        return (
            <div className="container my-3" id="div3">
            <div className="row">
            <form className="container was-validated col-sm-8 mt-3" action="#" onSubmit={this.onSubmit.bind(this)}>
                    <p className="lead text-uppercase">Dati anagrafici</p>
    
                    <div className="form-group">
                        <label htmlFor="name">Cognome e Nome *</label>
                        <br></br>
                        <input placeholder="nome" onChange={this.changeText.bind(this, "nome")} id="name" name="name" type="text" className="form-control" maxLength="40"/>
                        <div className="invalid-feedback">
                            Inserire nome e cognome
                        </div>
                    </div>

                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input placeholder="genere" onChange={this.changeText.bind(this, "genere")} type="radio" className="custom-control-input" id="male" name="gender" value="male"/>
                        <label className="custom-control-label" htmlFor="male">Uomo</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input placeholder="genere" onChange={this.changeText.bind(this, "genere")} type="radio" className="custom-control-input" id="female" name="gender" value="female"/>
                        <label className="custom-control-label" htmlFor="female">Donna</label><br></br>
                        <div className="invalid-feedback ml-2">
                            Inserire il genere
                        </div>
                    </div>
                    <br></br>

                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input placeholder="tipo" onChange={this.changeText.bind(this, "tipo")} type="radio" className="custom-control-input" id="autista" name="tipo" value="Autista" required/>
                        <label className="custom-control-label" htmlFor="autista">Autista</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input placeholder="tipo" onChange={this.changeText.bind(this, "tipo")} type="radio" className="custom-control-input" id="addetto alla consegna" name="tipo" value="Addetto alla consegna" required/>
                        <label className="custom-control-label" htmlFor="addetto alla consegna">Addetto alla consegna</label><br></br>
                        <div className="invalid-feedback ml-2">
                            Inserire il tipo di impiegato
                        </div>
                    </div>

                    <p className="lead text-danger mt-4">Nato a: *</p>
    
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Regione&nbsp;&nbsp;</span>
                        </div>
                        <select placeholder="regione" onChange={this.selF.bind(this, "regione")} id="region" className="custom-select" name="region">
                            <option value=""></option>
                            <option value="0">Abruzzo</option>
                            <option value="1">Basilicata</option>
                            <option value="2">Calabria</option>
                            <option value="3">Campania</option>
                            <option value="4">Emilia-Romagna</option>
                            <option value="5">Friuli-Venezia Giulia</option>
                            <option value="6">Lazio</option>
                            <option value="7">Liguria</option>
                            <option value="8">Lombardia</option>
                            <option value="9">Marche</option>
                            <option value="10">Molise</option>
                            <option value="11">Piemonte</option>
                            <option value="12">Puglia</option>
                            <option value="13">Sardegna</option>
                            <option value="14">Sicilia</option>
                            <option value="15">Toscana</option>
                            <option value="16">Trentino-Alto Adige</option>
                            <option value="17">Umbria</option>
                            <option value="18">Valle d'Aosta</option>
                            <option value="19">Veneto</option>
                        </select>
                        <div className="invalid-feedback">
                            Selezionare la regione di nascita
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Provincia&nbsp;</span>
                        </div>
                        <select placeholder="provincia" onChange={this.selF.bind(this, "provincia")} id="state" name="state" className="custom-select">
                            <option value=""></option>
                        </select>
                        <div className="invalid-feedback">
                            Selezionare la provincia di nascita
                        </div>
                    </div>
    
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Comune&nbsp;&nbsp;</span>
                        </div>
                        <select placeholder="citta" onChange={this.selF.bind(this, "citta")} id="town" name="town" className="custom-select">
                            <option value=""></option>
                        </select>
                        <div className="invalid-feedback">
                            Selezionare il comune di nascita
                        </div>
                    </div>
                    <br></br>

                    <div className="form-group">
                        <label htmlFor="birthdate">Data di Nascita *</label>
                        <br></br>
                        <input placeholder="dataN" onChange={this.changeText.bind(this, "dataN")} name="birthdate" id="birthdate" type="date" className="form-control"/>
                        <div className="invalid-feedback">
                            Selezionare la data di nascita
                        </div>
                    </div>

                    <p className="lead text-uppercase mt-3">Indirizzo</p>
                    <div className="form-row">
                        <div className="col-6">
                            <label htmlFor="address">Via/Piazza</label>
                            <br></br>
                            <input placeholder="indirizzo" onChange={this.changeText.bind(this, "indirizzo")} name="address" id="address" type="text" className="form-control" maxLength="40"/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-3">
                            <label htmlFor="addressnum">N.</label>
                            <br></br>
                            <input placeholder="N" onChange={this.changeText.bind(this, "N")} name="addressnum" id="addressnum" type="number" className="form-control" min="1" max="9999" size="4" maxLength="4" disabled/>
                            <div className="invalid-feedback">
                                1 - 9999
                            </div>
                        </div>
                        <br></br>
                        <div className="col-3">
                            <label htmlFor="cap">CAP.</label>
                            <br></br>
                            <input placeholder="CAP" onChange={this.changeText.bind(this, "CAP")} name="cap" id="cap" type="tel" className="form-control" pattern="^\d{5}$" title="Inserire 5 cifre da 00100 a 98168" size="5" maxLength="5" disabled/>
                            <div className="invalid-feedback">
                                00010 - 98168
                            </div>
                            <br></br>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="city">Località</label>
                            <br></br>
                            <input placeholder="localita" onChange={this.changeText.bind(this, "localita")} name="city" id="city" type="text" className="form-control" maxLength="15" disabled/>
                            <div className="invalid-feedback">
                                Nome località
                            </div>
                        </div>
                        <br></br>
                        <div className="col">
                            <label htmlFor="tel">Tel.</label>
                            <br></br>
                            <input placeholder="telefono" onChange={this.changeText.bind(this, "telefono")} name="tel" id="tel" type="tel" className="form-control" pattern="((((\+|00)[1-9]{2})|0)?([1-9]{2,3}))([0-9]{6,10})" title="Inserire il numero di telefono nel formato (+|00)<pref. int.><pref. loc.><numero> oppure 0<pref. loc.><numero>" size="20" maxLength="20" disabled/>
                            <div className="invalid-feedback">
                                ((+ / 00)(pref. int.) / 0)(pref. loc)(numero)
                            </div>
                        </div>
                    </div>
    
                    <p className="lead text-uppercase mt-3">Metodo Pagamento</p>
                    <div>
                        <div className="col-3">
                            <label htmlFor="numberpaper">Numero Carta</label>
                            <br></br>
                            <input placeholder="numero_carta" onChange={this.changeText.bind(this, "numero_carta")} name="numberpaper" id="numberpaper" type="text" className="form-control" maxLength="40"/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-3">
                            <label htmlFor="nominative">Nominativo</label>
                            <br></br>
                            <input placeholder="nominativo_pagamento" onChange={this.changeText.bind(this, "nominativo_p")} name="nominative" id="nominative" type="text" className="form-control" maxLength="40"/>
                            <div className="invalid-feedback">
                                Nome e cognome sulla carta
                            </div>
                        </div>
                        <br></br>
                        <div className="col-3">
                            <label htmlFor="dates">Data Scadenza</label>
                            <br></br>
                            <input placeholder="data_scadenza" onChange={this.changeText.bind(this, "data_scadenza")} name="dates" id="dates" type="date" className="form-control"/>
                            <div className="invalid-feedback">
                                Data di scadenza carta
                            </div>
                        </div>
                        <br></br>
                        <div className="col-3">
                            <label htmlFor="codex">Codice di Sicurezza</label>
                            <br></br>
                            <input placeholder="codice_sicurezza" onChange={this.changeText.bind(this, "codice_sicurezza")} name="codex" id="codex" type="text" className="form-control" maxLength="3"/>
                            <div className="invalid-feedback">
                                Codice a tre cifre solitamente dietro la carta
                            </div>
                        </div>
                    </div>

                    <p className="lead text-uppercase mt-3">Patente</p>
                    <div>
                        <div className="col-3">
                            <label htmlFor="idpatente">Identificativo</label>
                            <br></br>
                            <input placeholder="identificativo" onChange={this.changeText.bind(this, "identificativo")} name="idpatente" id="idpatente" type="text" className="form-control" maxLength="40"/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-3">
                            <label htmlFor="nazpatente">Nazionalità Patente</label>
                            <br></br>
                            <input placeholder="nazionalità_patente" onChange={this.changeText.bind(this, "nazionalità_patente")} name="nazpatente" id="nazpatente" type="text" className="form-control" maxLength="40"/>
                            <div className="invalid-feedback">
                                Nazione di provenienza della patente
                            </div>
                        </div>
                        <br></br>
                        <div className="col-3">
                            <label htmlFor="dataril">Data Rilascio</label>
                            <br></br>
                            <input placeholder="data_rilascio" onChange={this.changeText.bind(this, "data_rilascio")} name="dataril" id="dataril" type="date" className="form-control" maxLength="40"/>
                            <div className="invalid-feedback">
                                Data di rilascio
                            </div>
                        </div>
                        <br></br>
                        <div className="col-3">
                            <label htmlFor="datasca">Data Scadenza</label>
                            <br></br>
                            <input placeholder="data_scadenza" onChange={this.changeText.bind(this, "data_scadenza2")} name="datasca" id="datasca" type="date" className="form-control" maxLength="40"/>
                            <div className="invalid-feedback">
                                Data scadenza(Solitamente il giorno del compleanno)
                            </div>
                        </div>
                        <br></br>
                        <div className="col-3">
                            <label htmlFor="nompatente">Nominativo</label>
                            <br></br>
                            <input placeholder="nominativo_patente" onChange={this.changeText.bind(this, "nominativo_pat")} name="nompatente" id="nompatente" type="text" className="form-control" maxLength="40"/>
                            <div className="invalid-feedback">
                                Nome e cognome sul fronte della patente
                            </div>
                        </div>       
                    </div>

                    <p className="lead text-uppercase mt-3">Autenticazione</p>
                    <div className="form-group">
                        <label htmlFor="email">E-mail *</label>
                        <br></br>
                        <input placeholder="email" onChange={this.changeText.bind(this, "email")} name="email" id="email" type="email" className="form-control" size="32" maxLength="40"/>
                        <div className="invalid-feedback">
                            Inserire indirizzo e-mail
                        </div>
                    </div>
                    <br></br>
    
                    <div className="form-group">
                        <label htmlFor="pass">Password *</label>
                        <br></br>
                        <input placeholder="password" onChange={this.changeText.bind(this, "password")} name="pass" id="pass" type="password" className="form-control" title="Almeno 8 caratteri, una lettera maiuscola e un numero" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" size="32" maxLength="40"/>
                        <div className="invalid-feedback">
                            Almeno 8 caratteri di cui uno maiusciolo e un numero
                        </div>
                        <div className="valid-feedback text-warning">
                            Password media
                        </div>
                    </div>
                    <br></br>
    
                    <div className="form-group">
                        <label htmlFor="repass">Reinserisci password *</label>
                        <br></br>
                        <input name="repass" id="repass" type="password" className="form-control" size="32" maxLength="40" onchange="checkPassword(this)"/>
                        <div className="invalid-feedback">
                            Le password devono coincidere
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button onClick={this.registrazione.bind(this)} name="ok" id="ok" type="submit" className="btn btn-primary mt-3" formTarget="_blank">Invia</button>    
                    {successMessage}
                    {errorMessage}
                </form>
            </div>
            </div>
        )
    }
}

export default ImpiegatoFORM;