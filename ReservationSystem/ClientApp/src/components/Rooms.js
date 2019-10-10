import React, { Component } from 'react';
import RoomList from './RoomList';
import RoomSearch from './RoomSearch';

export default class Rooms extends Component {
  displayName = Rooms.name;

  constructor(props) {
    super(props);

    this.state = { rooms: [], loading: true }

    fetch('api/SampleData/Rooms')
      .then(response => response.json())
      .then(data => this.setState({ rooms: data, loading: false}));
  }

  render() {
    return(
    <React.Fragment>
      <RoomSearch />
      <RoomList rooms={this.state.rooms} loading={this.state.loading} />
    </React.Fragment>);
  }
}