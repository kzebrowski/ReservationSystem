import React, { Component } from 'react';
import Axios from 'axios';

export default class PasswordChange extends Component {
  displayName = PasswordChange.name;
  errorStyle = {marginBottom: "0px", outline: 'red auto 1px'}

  constructor(props) {
    super(props);

    this.state = { 
      password: '',
      passwordConfirmation: '',
      passwordValidationError: '',
      message: '',
      loading: false 
    };

    this.submitForm = this.submitForm.bind(this);
    this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    let params = this.props.match.params;
    this.setState({ loading: true });

    Axios.post("/api/user/changePassword/", {userId: params.userId, code: params.code, password: this.state.password})
      .then(() => this.setState({ message: "Twoje hasło zostało zmienione." }))
      .catch(() => this.setState({ message: "Niestety, nie udało się zmienić hasła. Spróbuj ponownie." }))
      .finally(() => this.setState({ loading: false }));
  }

  validatePasswordConfirmation() {
    this.setState({passwordValidationError: ''});

    if(this.state.passwordConfirmation === '')
      return;

    if (this.state.password !== this.state.passwordConfirmation)
      this.setState({passwordValidationError: 'Hasła muszą być identyczne'});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handlePasswordConfirmationChange(event) {
    this.setState({passwordConfirmation: event.target.value})
  }

  render() {
    return (
      <React.Fragment>
        <form className="generic-form mt-5" onSubmit={this.submitForm} style={{width: '250px'}}>
          <h3 className="mb-2">Zmiana hasła</h3>
          <input
            name="Password"
            type="Password"
            className="generic-input mb-2"
            onChange={this.handlePasswordChange}
            placeholder="Nowe hasło"
            required="required"
            minLength="8"
            onBlur={this.validatePasswordConfirmation} 
            style={this.state.passwordValidationError !== '' ? this.errorStyle : {}} />
          <input
            name="PasswordConfirmation"
            type="Password"
            className="generic-input mb-2"
            onChange={this.handlePasswordConfirmationChange}
            placeholder="Powtórz hasło"
            required="required"
            minLength="8"
            onBlur={this.validatePasswordConfirmation}
            style={this.state.passwordValidationError !== '' ? this.errorStyle : {}} />
          {this.state.passwordValidationError !== '' && <span className="generic-error-message">{this.state.passwordValidationError}</span>}
          <button disabled={this.state.PasswordConfirmationHasErrors !== ''} className="generic-submit-button-dark">Wyślij</button>
        </form>
      </React.Fragment>
    );
  }
}