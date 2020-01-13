import React, { Component } from 'react';
import Modal from 'react-modal';
import './styles/Modal.css';

export default class InformationModal extends Component {
  displayName = InformationModal.name;

  render() {
    return (
      <Modal isOpen={this.props.isOpen} className="centered-modal confirmation-modal">
        <div className="text-justify">{this.props.message}</div>
        <button className="generic-submit-button-dark okay-button" onClick={this.props.handleOkay}>Ok</button>
      </Modal>
    );
  }
}