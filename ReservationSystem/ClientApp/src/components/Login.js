import React, { Component } from 'react';
import './styles/LoginForm.css';

export default class Login extends Component {
  displayName = Login.name;

  constructor(props) {
    super(props);
  }

  handleLoginSubmit(event){
    event.preventDefault();
  }

  render(){
    return(
      <div className="login-form">
        <form onSubmit={this.handleLoginSubmit}>
          <input name="Email" type="email" className="login-input" placeholder="E-mail" required="required"/>
          <input name="Password" type="password" className="login-input" placeholder="Hasło" style={{marginBottom: "15px"}} required="required"/>
          <button className="login-button">Zaloguj</button>
          <button className="register-button">Stwórz konto</button>
        </form>
      </div>);
  }
}