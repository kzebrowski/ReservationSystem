import React, { Component } from 'react';
import './styles/UserPage.css';
import Axios from 'axios';
import ReservationsSection from './ReservationsSection';

export default class UserPage extends Component {
  displayName = UserPage.name;

  constructor(props) {
    super(props);
    this.state = {reservations: [], reservationsLoading: true, confirmationModalData: {isOpen: false, id: ''}};

    this.fetchReservations = this.fetchReservations.bind(this);

    this.fetchReservations();
  }

  fetchReservations() {
    this.setState({ reservationsLoading: true });

    Axios.get('/api/reservations/getbyemail/' + localStorage.userEmail, { headers: { Authorization: "Bearer " + localStorage.token } })
      .then(response => this.setState({ reservations: response.data, reservationsLoading: false}));
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
      <ReservationsSection isLoading={this.state.reservationsLoading} data={this.state.reservations} refreshData={this.fetchReservations} />
    </div>);
  }
}