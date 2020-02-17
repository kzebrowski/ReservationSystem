import React, { Component } from 'react';
import Modal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from './Loader';
import Axios from 'axios';
import history from '../history';
import './styles/Modal.css';
import './styles/ReservationModal.css';

export default class ReservationModal extends Component {
  displayName = this.displayName;

  constructor(props) {
    super(props);
    this.state = { loading: false, success: false };

    this.submitReservation = this.submitReservation.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
  }

  submitReservation() {
    this.setState({loading: true});

    Axios.post('api/reservations/create',
    {
      roomId: this.props.roomId,
      userId: localStorage.userId,
      startDate: this.props.stayStart,
      endDate: this.props.stayEnd
    },    
    { headers: { Authorization: "Bearer " + localStorage.token }})
    .then(() => this.setState({success: true}))
    .finally(() => this.setState({loading: false}));
  }

  handleCloseModalClick() {
    if(this.state.success){
      history.push("/");
    }
    this.props.handleCloseModalClick();
  }

  render() {
    return(
      <Modal className="centered-modal reservation-modal" isOpen={this.props.isOpen}>
        <Loader isLoading={this.state.loading} />
        <FontAwesomeIcon icon={faTimes} className="close-button" onClick={this.handleCloseModalClick}/>
        {this.state.success ? <h2 style={{margin: 'auto'}}>Twoja rezerwacja została potwierdzona.</h2> :
        <div className="reservation-modal-contents">
          <h3>Rezerwuj pokój</h3>
          <div className="reservation-info">
            <div className="room-name">{this.props.roomTitle}</div>
            <div>Początek pobytu: {this.props.stayStart}</div>
            <div>Koniec pobytu: {this.props.stayEnd}</div>
            <div>Liczba gości: {this.props.numberOfGuests}</div>            
            <div>Cena za noc: {this.props.price}zł</div>
            <div>Rezerujący: {localStorage.userEmail}</div>
            <button className="generic-submit-button-dark mb-2" style={{marginTop: '15px'}} onClick={this.submitReservation}>Potwierdź rezerwację</button>
            <button className="generic-submit-button-light" style={{margin: '0px'}} onClick={this.props.handleCloseModalClick}>Anuluj</button>
          </div>
        </div>}
      </Modal>
    )
  }
}