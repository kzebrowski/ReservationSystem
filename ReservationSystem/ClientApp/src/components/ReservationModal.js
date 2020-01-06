import React, { Component } from 'react';
import Modal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/Modal.css';
import './styles/ReservationModal.css'

export default class ReservationModal extends Component {
  displayName = this.displayName;

  render() {
    return(
      <Modal className="centered-modal reservation-modal" isOpen={this.props.isOpen}>
        <FontAwesomeIcon icon={faTimes} className="close-button" onClick={this.props.handleCloseModalClick}/>
        <div className="reservation-modal-contents">
          <h3>Rezerwuj pokój</h3>
          <div className="reservation-info">
            <div className="room-name">{this.props.roomTitle}</div>
            <div>Początek pobytu: {this.props.stayStart}</div>
            <div>Koniec pobytu: {this.props.stayEnd}</div>
            <div>Liczba gości: {this.props.numberOfGuests}</div>            
            <div>Cena za noc: {this.props.price}zł</div>
            <div>Rezerujący: {localStorage.userEmail}</div>
            <button className="generic-submit-button-dark mb-2" style={{marginTop: '15px'}}>Potwierdź rezerwację</button>
            <button className="generic-submit-button-light" style={{margin: '0px'}} onClick={this.props.handleCloseModalClick}>Anuluj</button>
          </div>
        </div>
      </Modal>
    )
  }
}