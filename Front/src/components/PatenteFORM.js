import React, { Component } from 'react';
import RegistrazioneService from './RegService';
import { Redirect } from 'react-router';

class PatenteFORM extends Component {
    constructor(props){
        super(props);
        this.state = {
           email: '',
           identificativo: '', 
           nazionalità_patente: '', 
           data_rilascio: '', 
           data_scadenza2: '', 
           nominativo_pat: '',
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
        this.RegistrazioneService.registrazione3(this.props.location.state.email,
                                                 this.state.identificativo,
                                                 this.state.nazionalità_patente,
                                                 this.state.data_rilascio,
                                                 this.state.data_scadenza2,
                                                 this.state.nominativo_pat,
                                                 this.regSuccess.bind(this),
                                                 this.regError.bind(this)
                                                 )
    }
    regSuccess(dataResult){
        this.setState({
                       showSuccess:true, 
                       successMessage:"Registrazione patente effettuata",
                       showError:false,
                       errorMessage:""});      
     }
    regError(errorData){
        this.setState({
                       showError:true, 
                       errorMessage:"Errore durante la registrazione della patente: " + errorData,
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
                                    identificativo: this.state.identificativo, 
                                    nazionalità_patente: this.state.nazionalità_patente, 
                                    data_rilascio: this.state.data_rilascio, 
                                    data_scadenza2: this.state.data_scadenza2, 
                                    nominativo_pat: this.state.nominativo_pat
                                  }     
            }}/>
        }
        return (
            <div className="container my-3" id="div3">
            <div className="row">
                <form className="container was-validated col-sm-8 mt-3" action="#" onSubmit={this.onSubmit.bind(this)}>
                <br></br>
                <br></br>  
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

export default PatenteFORM;