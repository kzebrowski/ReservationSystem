import React, { Component } from 'react';
import {Table} from 'reactstrap';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    this.updateRooms();
  }

  updateRooms() {
    this.setState({ loading: true });

    fetch('/api/rooms')
      .then(response => response.json())
      .then(data => this.setState({ rooms: data, loading: false}));
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
                <td><FontAwesomeIcon icon={faTrashAlt} /></td>
                <td><FontAwesomeIcon icon={faEdit} /></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}