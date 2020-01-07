import React, { Component } from 'react';
import Modal from 'react-modal';
import './styles/Modal.css';

export default class ConfirmationModal extends Component {
  displayName = ConfirmationModal.name;

  render() {
    return (
      <Modal isOpen={this.props.isOpen} className="centered-modal confirmation-modal">
        <div>{this.props.message}</div>
        <button className="generic-submit-button-dark confirm-button" onClick={() => this.props.handleYes(this.props.data)}>Tak</button>
        <button className="generic-submit-button-light decline-button" onClick={this.props.handleNo}>Nie</button>
      </Modal>
    );
  }
}