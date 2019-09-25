import React, { Component } from 'react';
import Room from './Room';

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
    return this.state.loading ? 
    "Wczytuje dane..."
    : <Room title = {this.state.rooms[0].title}/> ;
  }
}