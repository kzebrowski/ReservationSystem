import React, { Component } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/RegistrationForm.css';

export default class UserRegistrationForm extends Component {
  displayName = UserRegistrationForm.displayName;
  errorStyle = {marginBottom: "0px", outline: 'red auto 1px'}

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passowrdConfirmation: "",
      phoneNumber: "",
      emailValidationError: "",
      passwordValidationError: "",
      passowrdConfirmationValidationError: "",
      phoneNumberValidationError: ""
    }

    this.checkForValidationErrors = this.checkForValidationErrors.bind(this);
    this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassowrdConfirmationChange = this.handlePassowrdConfirmationChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let requestBody = JSON.stringify(
      {
        Email: this.state.email,
        Password: this.state.password,
        phoneNumber: this.state.phoneNumber
      });

    fetch("api/user/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: requestBody
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.id){
          this.props.handleGoBackClick();
        }
        else {
          if(!Array.isArray(data))
            data = [data];

          data.forEach(x => {
            if (x.field === "Email")
              this.setState({emailValidationError: x.message});
            else if (x.field === "PhoneNumber")
              this.setState({phoneNumberValidationError: x.message});
          });
        }
      });
  }

  checkForValidationErrors() {
    return this.state.emailValidationError !== ""
      || this.state.passwordValidationError !== ""
      || this.state.passowrdConfirmationValidationError !== ""
      || this.state.phoneNumberValidationError !== ""
  }
  
  validatePasswordConfirmation() {
    if (this.state.passowrdConfirmation != this.state.password)
      this.setState({passowrdConfirmationValidationError: "Hasła muszą być identyczne"});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value, emailValidationError: ""});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, passwordValidationError: ""});
  }
  
  handlePassowrdConfirmationChange(event) {
    this.setState({passowrdConfirmation: event.target.value, passowrdConfirmationValidationError: ""});
  }

  handlePhoneNumberChange(event) {
    this.setState({phoneNumber: event.target.value, phoneNumberValidationError: ""});
  }

  render() {
    return (
      <React.Fragment>
        <FontAwesomeIcon icon={faArrowLeft} className="go-back-from-registration-button" onClick={this.props.handleGoBackClick}/>
        <div className="registration-form">
          <form onSubmit={this.handleFormSubmit}>
            <input
              name="Email"
              className="registration-input"
              type="Email"
              onChange={this.handleEmailChange}
              placeholder="E-mail"
              required="required"
              style={ this.state.emailValidationError !== "" ? this.errorStyle : {} }/>
            {this.state.emailValidationError !== "" && <span className="input-error-message">{this.state.emailValidationError}</span>}
            <input
              name="Password"
              className="registration-input"
              type="Password"
              onChange={this.handlePasswordChange}
              placeholder="Hasło"
              required="required"
              minLength="8"
              onBlur={this.validatePasswordConfirmation}
              style={ this.state.passwordValidationError !== "" ? this.errorStyle : {} }/>
            {this.state.passwordValidationError !== "" && <span className="input-error-message">{this.state.passwordValidationError}</span>}
            <input
              name="PassowrdConfirmation"
              className="registration-input"
              type="Password"
              onChange={this.handlePassowrdConfirmationChange}
              placeholder="Powtórz hasło"
              required="required"
              minLength="8"
              style={ this.state.passowrdConfirmationValidationError !== "" ? this.errorStyle : {} }
              onBlur={this.validatePasswordConfirmation}/>
            {this.state.passowrdConfirmationValidationError !== "" && <span className="input-error-message">{this.state.passowrdConfirmationValidationError}</span>}
            <input
              name="PhoneNumber"
              className="registration-input"
              type="tel"
              pattern="[0-9]{9}"
              onChange={this.handlePhoneNumberChange}
              placeholder="Numer telefonu"
              style={ this.state.phoneNumberValidationError !== "" ? this.errorStyle : {} }/>
            {this.state.phoneNumberValidationError !== "" && <span className="input-error-message">{this.state.phoneNumberValidationError}</span>}
            <button
              className="create-account-button"
              disabled={() => this.checkForValidationErrors()}>Stwórz konto</button>
          </form>
        </div>
      </React.Fragment>
    );
    }
}