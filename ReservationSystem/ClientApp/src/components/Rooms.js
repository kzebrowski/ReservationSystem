import React, { Component } from 'react';
import RoomList from './RoomList';
import RoomSearch from './RoomSearch';

export default class Rooms extends Component {
  displayName = Rooms.name;

  constructor(props) {
    super(props);

    this.state = { rooms: [], loading: true }
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let params = this.props.match.params;

    if (params.startDate && params.endDate && params.numberOfGuests){
      this.fetchData(`api/SampleData/Search?startDate=${params.startDate}&endDate=${params.endDate}&numberOfGuests=${params.numberOfGuests}`);
    }
    else {
      this.fetchData('api/SampleData/Rooms');
    }
  }

  fetchData(url) {
    this.state = { loading: true }

    fetch(url)
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