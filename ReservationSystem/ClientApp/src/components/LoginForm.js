import React, { Component } from 'react';
import './styles/LoginForm.css';
import Axios from 'axios';

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
    this.handleResetPassowrdClick = this.handleResetPassowrdClick.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value, emailValidationError: ""});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, passwordValidationError: ""});
  }

  handleResetPassowrdClick(event) {
    event.preventDefault();

    if(this.state.email === "")
      this.props.showMessage("Wypełnij adres email w formularzu.");

    this.props.setLoading(true);
    Axios.post("api/user/resetPassword", '"' + this.state.email + '"', {
        headers: { 'content-type': 'application/json'}})
      .then(() => this.props.showMessage("Na twoje konto email został wysłany link do resetowania hasła."))
      .catch(() => this.props.showMessage("Wpisano niepoprawny, lub nieistniejący adres email."))
      .finally(() => this.props.setLoading(false));
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.props.setLoading(true);
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
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("userPhoneNumber", data.phoneNumber);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("isUserActivated", data.isActivated);
          localStorage.setItem("isUserAdmin", data.role === "Admin");
          this.props.onUserLogin();
        }
        else {
          if (data.field === "Email")
            this.setState({emailValidationError: data.message});
          else if (data.field === "Password")
            this.setState({passwordValidationError: data.message});
        }
      });

      this.props.setLoading(false);
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
          <button className="generic-submit-button-light" onClick={this.handleResetPassowrdClick}>Zapomniałem hasła</button>
        </form>
      </div>);
  }
}