import React, { Component } from 'react';
import Modal from 'react-modal';
import './styles/Modal.css';

export default class ConfirmationModal extends Component {
    displayName = ConfirmationModal.name;

    render() {
        return (
            <Modal isOpen={this.props.isOpen} className="centered-modal ">
                <div>{this.props.message}</div>
                <div className="generic-submit-button-dark" onClick={this.props.handleYes}>Tak</div>
                <div className="generic-submit-button-light" onClick={this.props.handleNo}>Nie</div>
            </Modal>
        );
    }
}