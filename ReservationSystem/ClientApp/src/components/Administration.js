import React, { Component } from 'react';
import {Table} from 'reactstrap';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionIcon from './ActionIcon';
import Axios from 'axios';
import './styles/Administration.css'

export default class Administration extends Component {
  displayName = Administration.name;

  constructor (props) {
    super(props);

    this.state = {
      loading: false,
      rooms: []
    }

    this.updateRooms = this.updateRooms.bind(this);
    this.handleRoomDeletion = this.handleRoomDeletion.bind(this);

    this.updateRooms();
  }

  updateRooms() {
    this.setState({ loading: true });

    fetch('/api/rooms')
      .then(response => response.json())
      .then(data => this.setState({ rooms: data, loading: false}));
  }

  handleRoomDeletion(id) {
    Axios.delete("/api/rooms/delete",{
      headers: { Authorization: "Bearer " + localStorage.token, 'content-type': 'application/json'},
      data: '"'+id+'"'})
      .then(x => this.updateRooms())
      .catch(x => console.log(x));
  }

  render() {
    return (
      <div className="administration-container">
        <h2 className="mb-4">Pokoje</h2>
        <a href="admin/rooms/add" className="mb-3">Dodaj</a>
        <Table>
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
            {this.state.rooms.map((x, i) => 
              <tr>
                <td>{i + 1}</td>
                <td>{x.title}</td>
                <td>{x.capacity}</td>
                <td>{x.price}</td>
                <td><ActionIcon icon={faTrashAlt} itemId={x.id} handleClick={this.handleRoomDeletion}/></td>
                <td><FontAwesomeIcon icon={faEdit} /></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}