import React, { Component } from 'react';
import Room from './Room';
import ClipLoader from 'react-spinners/ClipLoader';

export default class RoomList extends Component {
  displayName = RoomList.name;

  loaderStyle = `
    height: 100px;
    width: 100px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -50px;`;

  render() {
    return this.props.loading ?
        <ClipLoader
        css={this.loaderStyle}
        sizeUnit={"px"}
        size={105}
        color={'#000000'}
        loading={this.props.loading}
        />
      : this.props.rooms.map(x =>
        <Room key={x.id}
          id={x.id}
          image={x.imageUrl}
          title={x.title}
          description={x.description}
          capacity={x.capacity}
          price={x.price}
          onRoomTitleClick={this.props.onRoomTitleClick}/>);
  }
}