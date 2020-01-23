import React, { Component } from 'react';
import {Table} from 'reactstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ActionIcon from './ActionIcon';
import PulseLoader from 'react-spinners/PulseLoader';
import './styles/UserPage.css';
import Axios from 'axios';
import InformationModal from './InformationModal';
import ConfirmationModal from './ConfirmationModal';

export default class UserPage extends Component {
  displayName = UserPage.name;

  constructor(props) {
    super(props);
    this.state = {reservations: {}, reservationsLoading: true, modalmessage: '', confirmationModalData: {isOpen: false, id: ''}};

    this.fetchReservations = this.fetchReservations.bind(this);

    this.showMessage = this.showMessage.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.openConfirmationModal = this.openConfirmationModal.bind(this);
    this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
    this.cancelReservation = this.cancelReservation.bind(this);

    this.fetchReservations();
  }

  renderCancelButton = x => x.status === 'Anulowane' ? '' : <ActionIcon icon={faTimes} itemId={x.id} handleClick={this.openConfirmationModal}/>;

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
                <td colSpan='7'>
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
                <td>{this.renderCancelButton(x)}</td>
              </tr>
            )}
          </tbody>
        </Table>
        <InformationModal isOpen={this.state.modalmessage !== ''} message={this.state.modalmessage} handleOkay={this.clearMessage} />
        <ConfirmationModal isOpen={this.state.confirmationModalData.isOpen}
          message="Czy na pewno chcesz anulować rezerwację?"
          data={this.state.confirmationModalData.id}
          handleYes={this.cancelReservation}
          handleNo={this.hideConfirmationModal} />
    </div>);
  }
}