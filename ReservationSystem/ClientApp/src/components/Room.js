import React, { Component } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/Room.css';

export default class Room extends Component {
  displayName = Room.displayName;
  maxCapacityDisplayed = 4;

  render() {
    let capacityIcon;
    let capacityOverflown = this.props.capacity > this.maxCapacityDisplayed;

    capacityIcon = capacityOverflown ?
      <FontAwesomeIcon icon={faUser} style={{marginLeft: '1px'}}/>
      : Array(this.props.capacity).fill(<FontAwesomeIcon icon={faUser} style={{marginLeft: '1px'}}/>);

    return (
      <div className="room-outerview">
        <div className="room-small-picture-box" style={{ backgroundImage: 'url(' + this.props.imageUrl + ')' }}></div>
        <div className="room-outerview-details">
          <div className="room-header">{this.props.title}</div>
          <div className="room-capacity">
            {capacityIcon}{capacityOverflown ? " x " + this.props.capacity : ""}
          </div>
          <div className="room-description">{this.props.description}</div>
          <div className="room-price">{this.props.price}zł</div>
        </div>
      </div>);
  }
}