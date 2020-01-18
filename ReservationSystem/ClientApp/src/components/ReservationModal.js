import React, { Component } from 'react';
import Modal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClipLoader from 'react-spinners/ClipLoader';
import Axios from 'axios';
import history from '../history';
import './styles/Modal.css';
import './styles/ReservationModal.css';

export default class ReservationModal extends Component {
  displayName = this.displayName;

  loaderStyle = `
    height: 100px;
    width: 100px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -50px;
    z-index: 100;`;

  constructor(props) {
    super(props);
    this.state = { loading: false, success: false };

    this.submitReservation = this.submitReservation.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
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
  
  renderLoader() {
    if (this.state.loading) {
      return (
        <React.Fragment>
          <div className="loading-fog"/>
          <ClipLoader
            css={this.loaderStyle}
            sizeUnit={"px"}
            size={105}
            color={'#000000'}
            loading={true}
          />
        </React.Fragment>);
    }

    return null;
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
        { this.renderLoader() }
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