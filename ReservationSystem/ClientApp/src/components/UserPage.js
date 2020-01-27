import React, { Component } from 'react';
import './styles/UserPage.css';
import Axios from 'axios';
import InformationModal from './InformationModal';
import ConfirmationModal from './ConfirmationModal';
import ReservationTable from './ReservationsTable';

export default class UserPage extends Component {
  displayName = UserPage.name;

  constructor(props) {
    super(props);
    this.state = {reservations: [], reservationsLoading: true, modalmessage: '', confirmationModalData: {isOpen: false, id: ''}};

    this.fetchReservations = this.fetchReservations.bind(this);

    this.showMessage = this.showMessage.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.openConfirmationModal = this.openConfirmationModal.bind(this);
    this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
    this.cancelReservation = this.cancelReservation.bind(this);

    this.fetchReservations();
  }

  fetchReservations() {
    this.setState({ reservationsLoading: true });

    Axios.get('/api/reservations/getbyemail/' + localStorage.userEmail, { headers: { Authorization: "Bearer " + localStorage.token } })
      .then(response => this.setState({ reservations: response.data, reservationsLoading: false}));
  }

  clearMessage() {
    this.setState({modalmessage: ''});
  }

  showMessage(message) {
    this.setState({modalmessage: message});
  }

  openConfirmationModal(id) {
    this.setState({confirmationModalData: {id: id, isOpen: true} });
  }

  hideConfirmationModal() {
    this.setState({confirmationModalData: {isOpen: false} });
  }

  cancelReservation(id) {
    this.setState({reservationsLoading: true});

    Axios.post("/api/reservations/cancel", 
    '"'+id+'"',
    { headers: { Authorization: "Bearer " + localStorage.token, 'content-type': 'application/json' } })
      .then(() => {
        this.showMessage("Rezerwacja została anulowana.");
        this.fetchReservations()})
      .catch(() => this.showMessage("Wystąpił błąd. Spróbuj ponownie."))
      .finally(() => this.setState({reservationsLoading: false, confirmationModalData: {isOpen: false}}));
  }

  render() {
    return (
    <div className="administration-container">
      <h2>Witaj {localStorage.userEmail.split('@')[0]}!</h2>
      <h4 className="pt-4">Moje konto</h4>
      <div className="userdata-section">
        <div><b>Email</b>: {localStorage.userEmail}</div>
        <div><b>Numer telefonu</b>: {localStorage.userPhoneNumber}</div>
        <div><b>Hasło</b>: **********</div>
      </div>
      <h4 className="pt-4">Moje rezerwacje</h4>
        <ReservationTable isLoading={this.state.reservationsLoading} data={this.state.reservations} handleDelete={this.openConfirmationModal}/>
        <InformationModal isOpen={this.state.modalmessage !== ''} message={this.state.modalmessage} handleOkay={this.clearMessage} />
        <ConfirmationModal isOpen={this.state.confirmationModalData.isOpen}
          message="Czy na pewno chcesz anulować rezerwację?"
          data={this.state.confirmationModalData.id}
          handleYes={this.cancelReservation}
          handleNo={this.hideConfirmationModal} />
    </div>);
  }
}