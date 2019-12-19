import React, { Component } from 'react';
import RoomList from './RoomList';
import RoomSearch from './RoomSearch';
import Axios from 'axios';
import ReservationModal from './ReservationModal';

export default class Rooms extends Component {
  displayName = Rooms.name;

  constructor(props) {
    super(props);

    this.state = { rooms: [], loading: true, oldParams: {data: ""}, isModalOpen: false, reservationData: {}};

    this.handleRoomReservation = this.handleRoomReservation.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let params = this.props.match.params;
    
    if (params === this.state.oldParams){
      return;
    }
    else{
      this.setState({oldParams: params});
      if (params.startDate && params.endDate && params.numberOfGuests){
        this.fetchData(`api/rooms/search?stayStart=${params.startDate}&stayEnd=${params.endDate}&guests=${params.numberOfGuests}`);
      }
      else {
        this.fetchData('api/rooms');
      }
    }
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  handleRoomReservation(roomId){
    this.setState({isModalOpen: true});
  }

  fetchData(url) {
    this.setState({ loading: true });

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ rooms: data, loading: false}));
  }

  render() {
    let params = this.props.match.params;

    return(
    <React.Fragment>
      <RoomSearch />
      <RoomList rooms={this.state.rooms} loading={this.state.loading} onRoomTitleClick={this.handleRoomReservation}/>
      <ReservationModal
        isOpen={this.state.isModalOpen}
        handleCloseModalClick={this.closeModal}
        roomTitle={"Pokój czteroosobowy z widokiem na całe miasto"}
        numberOfGuests={5}
        stayStart={params.startDate}
        stayEnd={params.endDate}
        price={123}/>
    </React.Fragment>);
  }
}