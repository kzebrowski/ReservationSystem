import React, { Component } from 'react';
import {Table} from 'reactstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ActionIcon from './ActionIcon';
import PulseLoader from 'react-spinners/PulseLoader';
import './styles/UserPage.css';
import Axios from 'axios';

export default class UserPage extends Component {
  displayName = UserPage.name;

  constructor(props) {
    super(props);
    this.state = {reservations: {}, reservationsLoading: true};

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
      <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nazwa</th>
              <th>Początek pobutu</th>
              <th>Koniec pobytu</th>
              <th>Cena</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.reservationsLoading ? 
              <tr>
                <td colSpan='6'>
                <PulseLoader
                  css={'margin: 0 auto; width: 100px; height: 10px;'}
                  sizeUnit={"px"}
                  size={14}
                  color={'#000000'}
                  />
                </td>
              </tr> :
              this.state.reservations.map((x, i) => 
              <tr>
                <td>{i + 1}</td>
                <td>{x.roomName}</td>
                <td>{x.startDate.split('T')[0]}</td>
                <td>{x.endDate.split('T')[0]}</td>
                <td>{x.price}</td>
                <td>{x.status}</td>
                <td><ActionIcon icon={faTimes} itemId={x.id} /></td>
              </tr>
            )}
          </tbody>
        </Table>
    </div>);
  }
}