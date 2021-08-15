import React, { Component } from 'react';
import { insPrenotazioni } from './PrenotazioniService';
import { Redirect } from 'react-router';
import { aggiornaAutisti, aggiornaAddetti } from './ImpiegatoService';
import { aggiornaParcheggiAdmin } from './ParcheggiService';
import $ from 'jquery';

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

class NoleggiaBND extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_noleggio_iniziale: '',
            orario_noleggio_iniziale: '',
            data_noleggio_finale: '',
            orario_noleggio_finale: '',
            luogo_rilascio_ritiro: 'Parcheggio 1',
            presenza_autista: '',
            destinazione: 'Parcheggio 1',
            costo_prenotazione: '',
            object1: '',
            object2: '',
            object3: '',
            showSuccess:false,
            showError:false,
            errorMessage:"",
            successMessage:"",
            mancia: '0'
        }
        const result1 = aggiornaAutisti();
        result1.then((value) => {
            this.setState({object1: value})
        })
        const result2 = aggiornaAddetti();
        result2.then((value) => {
            this.setState({object2: value})
        })
        const result3 = aggiornaParcheggiAdmin();
        result3.then((value) => {
            this.setState({object3: value})
        })
    }
    selF(field, event) {
        this.setState({[field]:event.target.options[event.target.selectedIndex].text});
    }
    pagamento() {
        this.setState({costo_prenotazione:0});
        let data1 = new Date(this.state.data_noleggio_iniziale);
        let data2 = new Date(this.state.data_noleggio_finale);
        let differenza = Math.abs((parseInt((data2 - data1) / (1000 * 3600))));
        let differenza2 = GetHourDiff(this.state.orario_noleggio_iniziale, this.state.orario_noleggio_finale);
        let differenza3 = parseInt(differenza2.slice(0, 2));
        let somma = differenza + differenza3;
        let prezzo = parseInt(this.state.mancia) + this.props.location.state.prezzo * somma;
        this.setState({costo_prenotazione:prezzo});
    }
    changeText(field, event){
        this.setState({[field]:event.target.value});
    }
    onSubmit(event){
        event.preventDefault();
    }
    inserisciId(event) {
        const random1 = this.state.object1[Math.floor(Math.random() * this.state.object1.length)];
        this.setState({id_autista:random1.id,
                       id_addetto: ''});
    }
    inserisciId2(event) {
        const random2 = this.state.object2[Math.floor(Math.random() * this.state.object2.length)];
        this.setState({id_addetto:random2.id,
                       id_autista: ''});   
    }
    inPrenotazione(event) {
        insPrenotazioni(this.props.location.state.email,
                        this.state.data_noleggio_iniziale,
                        this.state.orario_noleggio_iniziale,
                        this.state.data_noleggio_finale,
                        this.state.orario_noleggio_finale,
                        this.state.luogo_rilascio_ritiro,
                        this.props.location.state.modello,
                        this.state.presenza_autista,
                        this.state.id_autista,
                        this.state.id_addetto,
                        this.state.destinazione,
                        this.props.location.state.carta,
                        this.state.costo_prenotazione,
                        this.preSuccess.bind(this),
                        this.preError.bind(this)
                        )
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
            $('#luogo').focusout(function(ev) {
                if ($(this).val() !== '') {
                    $('#select1').attr('disabled', 'disabled');
                    $('#select1').removeAttr('required');
                } else {
                    $('#select1').removeAttr('disabled');
                    $('#select1').attr('required', 'required');   
                }
            }).focusin(function(ev) {
                $('#select1').attr('disabled', 'disabled');
                $('#select1').removeAttr('required');           
            });

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

            $('#mobile').click(function(ev) {
                if ($(this).is(':checked')) {
                    $('#ok').removeClass('ok1');
                }
                else {
                    $('#ok').addClass('ok1');
                }    
            });
        })
    }
    render() {
        var successMessage = this.getSuccessMessage();
        var errorMessage = this.getErrorMessage();
        if(!this.props.location.state.patente && this.state.presenza_autista === 'No'){
            return(<Redirect to={{
                pathname: "/account",
                state: {
                    errore: true
            }}}/>)
        }
        if(this.state.showSuccess) {
            return <Redirect to={{pathname: "/account"}}/>
        }
        let select1 = document.getElementById('select1');
        for(let parcheggi in this.state.object3) {
            select1.add(new Option(this.state.object3[parcheggi].nome_parcheggio));
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
                            <label for="orarioA">Data noleggio (iniziale)</label>
                            <br></br>
                            <input placeholder="data noleggio iniziale" onChange={this.changeText.bind(this, "data_noleggio_iniziale")} name="data" id="data" type="date" class="form-control" maxlength="15" required/>
                            <div class="invalid-feedback">
                                Inserire data
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div class="form-row">
                        <div class="col">
                            <label for="orarioA">Orario noleggio (iniziale)</label>
                            <br></br>
                            <input placeholder="orario noleggio iniziale" onChange={this.changeText.bind(this, "orario_noleggio_iniziale")} name="orario" id="orario" type="time" class="form-control" maxlength="15" required/>
                            <div class="invalid-feedback">
                                Inserire orario
                            </div>
                        </div>
                    </div>
                    <br></br>
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
                    <div class="form-row">
                        <div class="col">
                            <label for="luogo">Luogo di rilascio e di ritiro</label>
                            <br></br>
                            <br></br>
                            <select id="select1" className="custom-select" onChange={this.selF.bind(this, "luogo_rilascio_ritiro")}></select>
                            <br></br>
                            <input placeholder="luogo rilascio ritiro personalizzato" onChange={this.changeText.bind(this, "luogo_rilascio_ritiro")} name="luogo" id="luogo" type="text" class="form-control" maxlength="48"/>
                            <div class="invalid-feedback">
                                Inserire luogo
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div class="form-group">
                        <label for="name">Modello scelto</label>
                        <br></br>
                        <input placeholder="modello" value={this.props.location.state.modello} id="modello" name="modello" type="text" className="form-control" maxlength="40" required/>
                        <div class="invalid-feedback">
                            Inserire modello
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col">
                            <label for="luogo">Mancia (volontaria)</label>
                            <br></br>
                            <input placeholder="mancia (volontaria)" onChange={this.changeText.bind(this, "mancia")} name="mancia" id="mancia" type="text" class="form-control" maxlength="48"/>
                        </div>
                    </div>
                    <br></br>
                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input placeholder="tipo" onChange={this.changeText.bind(this, "presenza_autista")} onClick={this.inserisciId.bind(this)} type="radio" className="custom-control-input" id="Sì" name="tipo" value="Sì" required/>
                        <label className="custom-control-label" for="Sì">Autista</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input placeholder="tipo" onChange={this.changeText.bind(this, "presenza_autista")} onClick={this.inserisciId2.bind(this)} type="radio" className="custom-control-input" id="No" name="tipo" value="No" required/>
                        <label className="custom-control-label" for="No">Addetto alla consegna</label><br></br>
                        <div class="invalid-feedback ml-2">
                            Vuoi un autista?
                        </div>
                    </div>
                    <br></br>
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
                    <br></br>
                    <div>
                        <center><button onClick={this.pagamento.bind(this)}>Calcola prezzo</button></center>
                        <center>{this.state.costo_prenotazione}€</center>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input placeholder="posseggo un dispositivo mobile" type="checkbox" className="custom-control-input" id="mobile" name="mobile" value="Sì" required/>
                        <label className="custom-control-label" for="mobile">Posseggo un dispositivo mobile</label>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button onClick={this.inPrenotazione.bind(this)} name="ok" id="ok" type="submit" class="btn btn-primary mt-3 ok1" formtarget="_blank">Invia</button>    
                    {successMessage}
                    {errorMessage}
                </form>
            </div>
            </div>
        )
    }    
}

export default NoleggiaBND;