import React, { Component } from 'react';
import './styles/LoginForm.css';

export default class LoginForm extends Component {
  displayName = LoginForm.name;

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailValidationError: "",
      passwordValidationError: ""
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value, emailValidationError: ""});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, passwordValidationError: ""});
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    let requestBody = JSON.stringify({Email: this.state.email, Password: this.state.password});

    fetch("api/authentication/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: requestBody
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.token){
          localStorage.setItem("token", data.token);
          localStorage.setItem("userEmail", data.email)
          this.props.onUserLogin();
        }
        else {
          if (data.field === "Email")
            this.setState({emailValidationError: data.message});
          else if (data.field === "Password")
            this.setState({passwordValidationError: data.message});
        }
      });
  }

  render(){
    return(
      <div className="login-form">
        <form onSubmit={this.handleLoginSubmit}>
          <input
            name="Email"
            type="email"
            className="login-input"
            onChange={this.handleEmailChange}
            placeholder="E-mail"
            required="required"
            style={ this.state.emailValidationError !== "" ? {marginBottom: "0px", outline: 'red auto 1px'} : {} }/>
          {this.state.emailValidationError !== "" && <span className="login-error-message">{this.state.emailValidationError}</span>}
          <input
            name="Password"
            type="password"
            className="login-input"
            onChange={this.handlePasswordChange}
            placeholder="Hasło"
            required="required"
            minLength="8"
            style={ this.state.passwordValidationError !== "" ? {marginBottom: "0px", outline: 'red auto 1px'} : {} }/>
          {this.state.passwordValidationError !== "" && <span className="login-error-message">{this.state.passwordValidationError}</span>}
          <button className="login-button">Zaloguj</button>
          <button className="register-button" onClick={this.props.handleRegisterClick}>Stwórz konto</button>
        </form>
      </div>);
  }
}