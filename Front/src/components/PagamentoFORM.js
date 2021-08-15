import React, { Component } from 'react';
import RegistrazioneService from './RegService';
import { Redirect } from 'react-router';

class PagamentoFORM extends Component {
    constructor(props){
        super(props);
        this.state = {
           email: '',
           numero_carta: '', 
           nominativo_p: '',
           data_scadenza: '', 
           codice_sicurezza: '', 
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
        this.RegistrazioneService.registrazione2(this.props.location.state.email,
                                                 this.state.numero_carta,
                                                 this.state.nominativo_p,
                                                 this.state.data_scadenza,
                                                 this.state.codice_sicurezza,
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
    render() {
        var successMessage = this.getSuccessMessage();
        var errorMessage = this.getErrorMessage();
        if(this.state.showSuccess) {
            return <Redirect to={{pathname: "/applica",
                                  state: {
                                    numero_carta: this.state.numero_carta, 
                                    nominativo_p: this.state.nominativo_p,
                                    data_scadenza: this.state.data_scadenza, 
                                    codice_sicurezza: this.state.codice_sicurezza 
                                  }
            }}/>
        }
        return (
            <div className="container my-3" id="div3">
            <div className="row">
                <form className="container was-validated col-sm-8 mt-3" action="#" onSubmit={this.onSubmit.bind(this)}>
                <br></br>
                <br></br>
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

export default PagamentoFORM;