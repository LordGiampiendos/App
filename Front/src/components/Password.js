import React from "react";
import LoginService from "./LoginService";
import { Redirect } from 'react-router';

export default class Recupero extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         username: '',
         showSuccess:false,
         showError:false,
         errorMessage:"",
         successMessage:"",
         object: ""
      }
      this.LoginService = new LoginService();
   }
   changeText(field, event){
      this.setState({[field]:event.target.value});
   }
   onSubmit(event){
      event.preventDefault();
   }
   recuperoSuccess(dataResult){
      this.setState({
                     showSuccess:true, 
                     successMessage:"Recupero effettuato",
                     showError:false,
                     errorMessage:""});      
   }
   recuperoError(errorData){
      this.setState({
                     showError:true, 
                     errorMessage:"Errore durante il recupero: " + errorData,
                     showSuccess:false,
                     successMessage:""});
   }
   recupero(event){
      this.LoginService.recupero(this.state.username, 
                              this.recuperoSuccess.bind(this), 
                              this.recuperoError.bind(this)
                              );                         
      console.log("Recupero con username: ", this.state.username);
   }
   getSuccessMessage(){
      if(this.state.showSuccess){
         return (
            <div style={{color:"green", position: "relative", top: "13px", left: "30px"}}>
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
            <div style={{color:"red", position: "relative", top: "13px", left: "30px"}}>
                {this.state.errorMessage}
            </div>
          );
      }else{
         return (
            <div></div>
         );
      }
   }
   render(){
      var successMessage = this.getSuccessMessage();
      var errorMessage = this.getErrorMessage();
      if (this.state.showSuccess) {
         return <Redirect to={{
            pathname: "/login"
         }}
         />
      }
      return(
         <div id="div4">
            <div className = "container">
                <div className = "row">
                    <div>
                       <br></br>
                       <form className="container col-sm-8 mt-3" action="/" onSubmit={this.onSubmit.bind(this)}>
                          <h1>Inserie E-mail</h1>
                          <div id="f1" className = "form-group">
                             <input 
                                 type="text"
                                 className = "form-control"
                                 placeholder="username"
                                 value = {this.state.username || ''}
                                 onChange = {this.changeText.bind(this, "username")}/>
                          </div>
                          <br></br>
                          <button 
                              type="submit"
                              className = "btn btn-primary pull-right"
                              onClick={this.recupero.bind(this)}
                              href="/account">
                              Invio
                          </button>
                          {successMessage}
                          {errorMessage}
                      </form>
                   </div>
              </div>
         </div>
     </div>
   );
 }
}