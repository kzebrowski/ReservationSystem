import React, { Component } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import UserRegistrationForm from './UserRegistrationForm';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/Modal.css';

export default class LoginModal extends Component {
  displayName = LoginModal.name;

  constructor(props) {
    super(props);

    this.state = {
      isRegister: false
    };

    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
  }

  handleRegisterClick() {
    this.setState({isRegister: true});
  }

  handleGoBackClick() {
    this.setState({isRegister: false});
  }

  handleCloseModalClick() {
    this.props.handleCloseModalClick();
    this.setState({isRegister: false});
  }

  render() {
    return (
      <Modal className='login-modal centered-modal' isOpen={this.props.isOpen}>
        <FontAwesomeIcon icon={faTimes} className="close-button" onClick={this.handleCloseModalClick}/>
        {this.state.isRegister ?
          <UserRegistrationForm handleGoBackClick={this.handleGoBackClick}/> :
          <LoginForm onUserLogin={this.props.handleUserLogin} handleRegisterClick={this.handleRegisterClick}/>}
      </Modal>
    );
  }
}