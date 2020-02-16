import React, { Component } from 'react';
import Modal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class StatusChangeModal extends Component {
  displayName = StatusChangeModal.name;

  render() {
    return (
      <Modal isOpen={this.props.isOpen} className="centered-modal">
        <FontAwesomeIcon icon={faTimes} className="close-button" onClick={this.handleCloseModalClick}/>
      </Modal>
    );
  }
}