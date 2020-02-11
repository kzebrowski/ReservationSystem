import React, { Component } from 'react';
import {Table} from 'reactstrap';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import {Link} from 'react-router-dom';
import history from '../history';
import ActionIcon from './ActionIcon';
import Axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import ConfirmationModal from './ConfirmationModal';
import ReservationsSection from './ReservationsSection';
import './styles/Administration.css';
import ReservationSearch from './ReservationsSearch';

export default class Administration extends Component {
  displayName = Administration.name;
  confirmationModalData = null;

  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      rooms: [],
      isConfirmationModalOpen: false,
      reservationsLoading: true,
      confirmationModalData: {isOpen: false, id: ''}
    }

    this.updateRooms = this.updateRooms.bind(this);
    this.handleRoomDeletion = this.handleRoomDeletion.bind(this);
    this.fetchReservations = this.fetchReservations.bind(this);

    this.updateRooms();
    this.fetchReservations();
  }

  updateRooms() {
    this.setState({ loading: true });

    fetch('/api/rooms')
      .then(response => response.json())
      .then(data => this.setState({ rooms: data, loading: false}));
  }

  fetchReservations() {
    this.setState({ reservationsLoading: true });

    Axios.get('/api/reservations/getbyemail/' + localStorage.userEmail, { headers: { Authorization: "Bearer " + localStorage.token } })
      .then(response => this.setState({ reservations: response.data, reservationsLoading: false}));
  }

  handleRoomDeletion(id) {
    this.confirmationModalData = {id: id};
    this.setState({isConfirmationModalOpen: true});
  }

  deleteRoom(id) {
    this.setState({ loading: true });

    Axios.delete("/api/rooms/delete", {
    headers: { Authorization: "Bearer " + localStorage.token, 'content-type': 'application/json'},
    data: '"'+id+'"'})
    .then(x => this.updateRooms())
    .catch(x => {
      console.log(x);
      alert("Wystąpił błąd")})
    .finally(x => this.setState({isConfirmationModalOpen: false, loading: false }));
  }

  handleRoomEdit(id) {
    history.push("/admin/rooms/edit/" + id);
  }

  render() {
    return (
      <div className="administration-container">
        <h2 className="mb-4">Pokoje</h2>
        <Link to="/admin/rooms/add" className="mb-3">Dodaj</Link>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nazwa</th>
              <th>Pojemność</th>
              <th>Cena</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.loading ? 
              <td colSpan='6'>
              <PulseLoader
                css={'margin: 0 auto; width: 100px; height: 10px;'}
                sizeUnit={"px"}
                size={14}
                color={'#000000'}
                />
              </td> :
              this.state.rooms.map((x, i) => 
              <tr>
                <td>{i + 1}</td>
                <td>{x.title}</td>
                <td>{x.capacity}</td>
                <td>{x.price}</td>
                <td><ActionIcon icon={faTrashAlt} itemId={x.id} handleClick={this.handleRoomDeletion}/></td>
                <td><ActionIcon icon={faEdit} itemId={x.id} handleClick={this.handleRoomEdit}/></td>
              </tr>
            )}
          </tbody>
        </Table>

        <h2 className="pt-4 mb-4">Rezerwacje</h2>
        <ReservationSearch />
        <ReservationsSection isLoading={this.state.reservationsLoading} data={this.state.reservations} refreshData={this.fetchReservations} />

        <ConfirmationModal
          message="Czy na pewno chcesz usunąć ten pokój?"
          isOpen={this.state.isConfirmationModalOpen}
          data = {this.confirmationModalData}
          handleNo={() => this.setState({isConfirmationModalOpen: false})}
          handleYes={(data) => this.deleteRoom(data.id)} />
      </div>
    );
  }
}