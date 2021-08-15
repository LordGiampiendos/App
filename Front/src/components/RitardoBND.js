import React, { Component } from 'react';
import { ritPrenotazioni } from './PrenotazioniService';
import { Redirect } from 'react-router';
import $ from 'jquery';
import { aggiornaParcheggiAdmin } from './ParcheggiService';

function GetHourDiff(pStartHour, pEndHour) {
    var res = "";
    var aTmp="";
    //Trasformo l'orario di inizio in minuti
    aTmp=pStartHour.split(":");
    var nStartMin = (Number(aTmp[0]) * 60) + Number(aTmp[1]);
    //Trasformo l'orario di fine in minuti
    aTmp=pEndHour.split(":");
    var nEndMin = (Number(aTmp[0]) * 60) + Number(aTmp[1]);
    //Calcolo la differenza
    var nDiff = 0;
    if (nStartMin > nEndMin) {
        nDiff = nStartMin - nEndMin;
    } else {
        nDiff = nEndMin - nStartMin;
    }
    //Formatto la stringa di uscita
    var nDiffMin = 0;
    var nDiffHour  = 0;
    if (nDiff > 59) {
        nDiffMin = nDiff % 60;
        nDiffHour = (nDiff - nDiffMin) / 60;
    } else {
        nDiffMin = nDiff;
    }
    if (nDiffHour < 10) res += "0";
    res += nDiffHour;
    res += ":";
    if (nDiffMin < 10) res += "0";
    res += nDiffMin;
    return res;
}

class RitardoBND extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_noleggio_iniziale: this.props.location.state.DI,
            orario_noleggio_iniziale: this.props.location.state.OI,
            data_noleggio_finale: '',
            orario_noleggio_finale: '',
            costo_prenotazione: '',
            destinazione: 'Parcheggio 1',
            restituito: '',
            object3: '',
            showSuccess:false,
            showError:false,
            errorMessage:"",
            successMessage:""
        }
        const result3 = aggiornaParcheggiAdmin();
        result3.then((value) => {
            this.setState({object3: value})
        })
    }
    pagamento() {
        let data1 = new Date(this.state.data_noleggio_iniziale);
        let data2 = new Date(this.state.data_noleggio_finale);
        let differenza = Math.abs((parseInt((data2 - data1) / (1000 * 3600))));
        let differenza2 = GetHourDiff(this.state.orario_noleggio_iniziale, this.state.orario_noleggio_finale);
        let differenza3 = parseInt(differenza2.slice(0, 2));
        let somma = differenza + differenza3;
        let prezzo = this.props.location.state.costo + somma * 0.1;
        this.setState({costo_prenotazione:prezzo});
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
    showDestinazione() {
        this.setState({show:!this.state.show});
    }
    inPrenotazione(event) {
        ritPrenotazioni(this.props.location.state.email,
                        this.props.location.state.id,
                        this.state.data_noleggio_finale,
                        this.state.orario_noleggio_finale,
                        this.state.destinazione,
                        this.state.restituito,
                        this.state.costo_prenotazione,
                        this.preSuccess.bind(this),
                        this.preError.bind(this))
    }
    preSuccess(dataResult){
        this.setState({
                       showSuccess:true, 
                       successMessage:"Prenotazione effettuata",
                       showError:false,
                       errorMessage:""});      
     }
    preError(errorData){
        this.setState({
                       showError:true, 
                       errorMessage:"Errore durante la prenotazione: " + errorData,
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
            $('#destinazione').focusout(function(ev) {
                if ($(this).val() !== '') {
                    $('#select2').attr('disabled', 'disabled');
                    $('#select2').removeAttr('required');
                } else {
                    $('#select2').removeAttr('disabled');
                    $('#select2').attr('required', 'required');   
                }
            }).focusin(function(ev) {
                $('#select2').attr('disabled', 'disabled');
                $('#select2').removeAttr('required');
            });
        })
    }
    render() {
        var successMessage = this.getSuccessMessage();
        var errorMessage = this.getErrorMessage();
        if(this.state.showSuccess) {
            return <Redirect to={{pathname: "/account"}}/>
        }
        let select2 = document.getElementById('select2');
        for(let parcheggi2 in this.state.object3) {
            select2.add(new Option(this.state.object3[parcheggi2].nome_parcheggio));
        }
        return (
            <div class="container my-3" id="div3">
            <div class="row">
            <form class="container was-validated col-sm-8 mt-3" action="#" onSubmit={this.onSubmit.bind(this)}>
                    <p class="lead text-uppercase">Dati prenotazione</p>

                    <div class="form-row">
                        <div class="col">
                            <label for="orarioA">Data noleggio (finale)</label>
                            <br></br>
                            <input placeholder="data noleggio finale" onChange={this.changeText.bind(this, "data_noleggio_finale")} name="data" id="data" type="date" class="form-control" maxlength="15" required/>
                            <div class="invalid-feedback">
                                Inserire data
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div class="form-row">
                        <div class="col">
                            <label for="orarioC">Orario noleggio (finale)</label>
                            <br></br>
                            <input placeholder="orario noleggio finale" onChange={this.changeText.bind(this, "orario_noleggio_finale")} name="orario" id="orario" type="time" class="form-control" maxlength="15" required/>
                            <div class="invalid-feedback">
                                Inserire orario
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div class="form-group">
                        <div class="col">
                            <label for="luogo">Destinazione (o luogo restituzione)</label>
                            <br></br>
                            <br></br>
                            <select id="select2" className="custom-select" onChange={this.selF.bind(this, "destinazione")}></select>
                            <br></br>
                            <input placeholder="destinazione personalizzata" onChange={this.changeText.bind(this, "destinazione")} name="luogo" id="destinazione" type="text" class="form-control" maxlength="48"/>
                            <div class="invalid-feedback">
                                Inserire destinazione
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div class="form-group">
                        <div class="col">
                            <label for="motivazione">Motivazione</label>
                            <br></br>
                            <input placeholder="motivazione" onChange={this.changeText.bind(this, "restituito")} name="motivazione" id="motivazione" type="text" class="form-control" maxlength="48" required/>
                            <div class="invalid-feedback">
                                Inserire motivazione
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                        <center><button onClick={this.pagamento.bind(this)}>Calcola prezzo</button></center>
                        <center>{this.state.costo_prenotazione}€</center>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button onClick={this.inPrenotazione.bind(this)} name="ok" id="ok" type="submit" class="btn btn-primary mt-3" formtarget="_blank">Invia</button>    
                    {successMessage}
                    {errorMessage}
                </form>
            </div>
            </div>
        )
    }    
}

export default RitardoBND;