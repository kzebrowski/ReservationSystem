import React, { Component } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import InformationModal from './InformationModal';
import UserRegistrationForm from './UserRegistrationForm';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/Modal.css';
import Loader from './Loader';

export default class LoginModal extends Component {
  displayName = LoginModal.name;

  constructor(props) {
    super(props);

    this.state = {
      isRegister: false,
      message: '',
      loading: false
    };

    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleInformationModalClose = this.handleInformationModalClose.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  setLoading(value) {
    this.setState({loading: value});
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
  
  handleInformationModalClose() {
    this.setState({message: ''});
  }

  showMessage(value) {
    this.setState({message: value});
  }

  render() {
    return (
      <React.Fragment>
        <Modal className='login-modal centered-modal' isOpen={this.props.isOpen}>
          <FontAwesomeIcon icon={faTimes} className="close-button" onClick={this.handleCloseModalClick}/>
          {this.state.isRegister ?
            <UserRegistrationForm handleGoBackClick={this.handleGoBackClick}/> :
            <LoginForm
              onUserLogin={this.props.handleUserLogin}
              handleRegisterClick={this.handleRegisterClick}
              showMessage={this.showMessage} 
              setLoading={this.setLoading} />}
          <Loader isLoading={this.state.loading} />
        </Modal>
        <InformationModal isOpen={this.state.message !== ''} message={this.state.message} handleOkay={this.handleInformationModalClose} />
      </React.Fragment>
    );
  }
}