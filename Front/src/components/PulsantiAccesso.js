import React from "react";
import LoginService from "./LoginService";
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";

export default class PulsantiAccesso extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         username: '',
         password: '',
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
   loginSuccess(dataResult){
      this.setState({object:dataResult}); 
      this.setState({
                     showSuccess:true, 
                     successMessage:"Login effettuato",
                     showError:false,
                     errorMessage:""});             
   }
   loginError(errorData){
      this.setState({
                     showError:true, 
                     errorMessage:"Errore durante il login: " + errorData,
                     showSuccess:false,
                     successMessage:""});
   }
   login(event){
      this.LoginService.login(this.state.username, 
                              this.state.password,
                              this.loginSuccess.bind(this), 
                              this.loginError.bind(this)
                              );                         
      console.log("Login con username: ", this.state.username);
      console.log("Login con password: ", this.state.password);
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
            pathname: "/account",
            state: {email : this.state.username,
                    password: this.state.password,
                    object: this.state.object
            }
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
                          <h1>Login</h1>
                          <div id="f1" className = "form-group">
                             <input 
                                 type="text"
                                 className = "form-control"
                                 placeholder="username"
                                 value = {this.state.username || ''}
                                 onChange = {this.changeText.bind(this, "username")}/>
                          </div>
                          <br></br>
                          <div id="f2" className = "form-group">
                             <input 
                                type="password"
                                className = "form-control"
                                placeholder="password"
                                value = {this.state.password}
                                onChange = {this.changeText.bind(this, "password")}/>
                          </div>
                          <br></br>
                          <button 
                              type="submit"
                              className = "btn btn-primary pull-right"
                              onClick={this.login.bind(this)}
                              href="/account">
                              Invio
                          </button>
                          {successMessage}
                          {errorMessage}
                      </form>
                      <Link to="/registrazione">Registrati</Link>
                      <br></br>
                      <br></br>
                      <Link id="rc" to="/password">Recupera password</Link>
                   </div>
              </div>
         </div>
     </div>
   );
 }
}