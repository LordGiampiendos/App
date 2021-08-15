import React, { Component } from 'react';
import { inserisciParcheggiAdmin } from './ParcheggiService';
import { Redirect } from 'react-router';

class ParcheggioFORM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome_parcheggio: '',
            luogo: '',
            orario_apertura: '',
            orario_chiusura: '',
            showSuccess:false,
            showError:false,
            errorMessage:"",
            successMessage:""
        }
    }
    changeText(field, event){
        this.setState({[field]:event.target.value});
    }
    onSubmit(event){
        event.preventDefault();
    }
    inParcheggio(event) {
        inserisciParcheggiAdmin(this.state.nome_parcheggio,
                                this.state.luogo,
                                this.state.orario_apertura,
                                this.state.orario_chiusura,
                                this.parSuccess.bind(this),
                                this.parError.bind(this)
                                )
    }
    parSuccess(dataResult){
        this.setState({
                       showSuccess:true, 
                       successMessage:"Registrazione parcheggio effettuata",
                       showError:false,
                       errorMessage:""});      
     }
    parError(errorData){
        this.setState({
                       showError:true, 
                       errorMessage:"Errore durante la registrazione del parcheggio: " + errorData,
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
            return <Redirect to={{pathname: "/account"}}/>
        }
        return (
            <div className="container my-3" id="div3">
            <div className="row">
            <form className="container was-validated col-sm-8 mt-3" action="#" onSubmit={this.onSubmit.bind(this)}>
                    <p className="lead text-uppercase">Dati parcheggio</p>
    
                    <div className="form-group">
                        <label htmlFor="name">Nome parcheggio *</label>
                        <br></br>
                        <input placeholder="nome parcheggio" onChange={this.changeText.bind(this, "nome_parcheggio")} id="name" name="name" type="text" className="form-control" maxLength="40" required/>
                        <div className="invalid-feedback">
                            Inserire nome parcheggio
                        </div>
                    </div>
                    <br></br>
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="luogo">Località</label>
                            <br></br>
                            <input placeholder="luogo" onChange={this.changeText.bind(this, "luogo")} name="luogo" id="luogo" type="text" className="form-control" maxLength="48" required/>
                            <div className="invalid-feedback">
                                Inserire luogo
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="orarioA">Orario apertura</label>
                            <br></br>
                            <input placeholder="orario apertura" onChange={this.changeText.bind(this, "orario_apertura")} name="orario" id="orario" type="time" className="form-control" maxLength="15" required/>
                            <div className="invalid-feedback">
                                Inserire orario
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="orarioC">Orario chiusura</label>
                            <br></br>
                            <input placeholder="orario chiusura" onChange={this.changeText.bind(this, "orario_chiusura")} name="orario" id="orario" type="time" className="form-control" maxLength="15" required/>
                            <div className="invalid-feedback">
                                Inserire orario
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button onClick={this.inParcheggio.bind(this)} name="ok" id="ok" type="submit" className="btn btn-primary mt-3" formTarget="_blank">Invia</button>    
                    {successMessage}
                    {errorMessage}
                </form>
            </div>
            </div>
        )
    }
}

export default ParcheggioFORM;