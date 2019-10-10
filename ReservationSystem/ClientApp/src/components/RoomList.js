import React, { Component } from 'react';
import Room from './Room';

export default class RoomList extends Component {
  displayName = RoomList.name;

  render() {
    return this.props.loading ?
      "Wczytuje dane..."
      : this.props.rooms.map(x =>
        <Room key={x.id}
          imageUrl={x.imageUrl}
          title={x.title}
          description={x.description}
          capacity={x.capacity}
          price={x.price} />);
  }
}