import React, { Component } from 'react';
import './styles/UserPage.css';
import Axios from 'axios';
import ReservationsSection from './ReservationsSection';
import ConfirmationModal from './ConfirmationModal';
import InformationModal from './InformationModal';
import Loader from './Loader';

export default class UserPage extends Component {
  displayName = UserPage.name;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      reservations: [], message: '',
      reservationsLoading: true,
      isConfirmationModalOpen: false};

    this.fetchReservations = this.fetchReservations.bind(this);

    this.fetchReservations();
    this.handleChangePasswordClick = this.handleChangePasswordClick.bind(this);
    this.setConfirmationModalOpen = this.setConfirmationModalOpen.bind(this);
    this.sendPasswordResettingLink = this.sendPasswordResettingLink.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  fetchReservations() {
    this.setState({ reservationsLoading: true });

    Axios.get('/api/reservations/getbyemail/' + localStorage.userEmail, { headers: { Authorization: "Bearer " + localStorage.token } })
      .then(response => this.setState({ reservations: response.data, reservationsLoading: false}));
  }

  handleChangePasswordClick(event) {
    event.preventDefault();
    this.setConfirmationModalOpen(true);
  }

  setConfirmationModalOpen(value) {
    this.setState({isConfirmationModalOpen: value});
  }

  setMessage(value) {
    this.setState({message: value});
  }

  setLoading(value) {
    this.setState({loading: value});
  }

  sendPasswordResettingLink() {
    this.setLoading(true);
    this.setConfirmationModalOpen(false);

    Axios.post("api/user/resetPassword", '"' + localStorage.getItem("userEmail") + '"', {
      headers: { 'content-type': 'application/json'}})
    .then(() => this.setMessage("Na twoje konto email został wysłany link do resetowania hasła."))
    .catch(() => this.setMessage("Wpisano niepoprawny, lub nieistniejący adres email."))
    .finally(() => this.setLoading(false));
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
        <a href="" onClick={this.handleChangePasswordClick}>Zmień hasło</a>
      </div>
      <h4 className="pt-4">Moje rezerwacje</h4>
      <ReservationsSection isLoading={this.state.reservationsLoading} data={this.state.reservations} refreshData={this.fetchReservations} />
      <ConfirmationModal
        isOpen={this.state.isConfirmationModalOpen}
        message="Czy na pewno chcesz zmienić hasło?"
        handleYes={this.sendPasswordResettingLink}
        handleNo={() => this.setConfirmationModalOpen(false)} />
      <InformationModal isOpen={this.state.message !== ''} message={this.state.message} handleOkay={() => this.setMessage('')} />
      <Loader isLoading={this.state.loading} />
    </div>);
  }
}