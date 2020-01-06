import React, { Component } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/Room.css';

export default class Room extends Component {
  displayName = Room.displayName;
  maxCapacityDisplayed = 4;

  getRandomId = () => { return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) }; 
  
  constructor(props){
    super(props);

    this.onRoomTitleClick = this.onRoomTitleClick.bind(this);
  }

  onRoomTitleClick() {
    let registrationData = {
      roomId: this.props.id,
      title: this.props.title,
      price: this.props.price
    }

    this.props.onRoomTitleClick(registrationData);
  }

  render() {
    let capacityOverflown = this.props.capacity > this.maxCapacityDisplayed;
    let capacityIcon = capacityOverflown ?
      <FontAwesomeIcon icon={faUser} style={{marginLeft: '1px'}}/>
      : Array(this.props.capacity).fill().map(() => <FontAwesomeIcon key={this.getRandomId()} icon={faUser} style={{marginLeft: '1px'}}/>);

    return (
      <div className="room-outerview">
        <div className="room-small-picture-box" style={{ backgroundImage: 'url(' + this.props.image + ')' }}></div>
        <div className="room-outerview-details">
          <div className="room-header" onClick={() => this.onRoomTitleClick(this.props.id)}>{this.props.title}</div>
          <div className="room-capacity">
            {capacityIcon}{capacityOverflown ? " x " + this.props.capacity : ""}
          </div>
          <div className="room-description">{this.props.description}</div>
          <div className="room-price">{this.props.price}zł</div>
        </div>
      </div>);
  }
}