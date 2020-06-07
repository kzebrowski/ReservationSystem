import React, { Component } from 'react';
import RoomList from './RoomList';
import RoomSearch from './RoomSearch';
import ReservationModal from './ReservationModal';
import InformationModal from './InformationModal';

export default class Rooms extends Component {
  displayName = Rooms.name;

  constructor(props) {
    super(props);

    this.state = { rooms: [], loading: true, oldParams: {data: ""}, isModalOpen: false, reservationData: {}, message: ''};

    this.handleRoomReservation = this.handleRoomReservation.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeInformationModal = this.closeInformationModal.bind(this);
    this.showMessage = this.showMessage.bind(this);

    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let params = this.props.match.params;
    
    if (params === this.state.oldParams){
      return;
    }
    else{
      this.setState({oldParams: params});
      if (this.paramsAreFilled(params)){
        this.fetchData(`api/rooms/search?stayStart=${params.startDate}&stayEnd=${params.endDate}&guests=${params.numberOfGuests}`);
      }
      else {
        this.fetchData('api/rooms');
      }
    }
  }

  paramsAreFilled = params => params.startDate && params.endDate && params.numberOfGuests;

  closeModal() {
    this.setState({isModalOpen: false});
  }

  closeInformationModal() {
    this.setState({message: ''});
  }

  showMessage(message) {
    this.setState({message: message});
  }

  handleRoomReservation(reservationData){
    if(!localStorage.getItem('token')) {
      this.showMessage('Aby dokonać rezerwacji, musisz się zalogować.');
      return;
    }
    if(localStorage.isUserActivated === 'false') {
      this.showMessage('Aby dokonać rezerwacji musisz aktywować konto. Na twój adres email wysłaliśmy link aktywacyjny.');
      return;
    }
    if(!this.paramsAreFilled(this.props.match.params)) {
      this.showMessage('Wypełnij datę pobytu oraz liczbę gości, w formularzu znajdujacym się w górnej części strony, a następnie naciśnij przycisk wyszukiwania.');
      return;
    }
      
    this.setState({isModalOpen: true, reservationData: reservationData});
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
      <RoomSearch stayStart={params.startDate} stayEnd={params.endDate} numberOfGuests={params.numberOfGuests} />
      <RoomList rooms={this.state.rooms} loading={this.state.loading} onRoomTitleClick={this.handleRoomReservation}/>
      <ReservationModal
        roomId = {this.state.reservationData.roomId}
        isOpen={this.state.isModalOpen}
        handleCloseModalClick={this.closeModal}
        roomTitle={this.state.reservationData.title}
        numberOfGuests={params.numberOfGuests}
        stayStart={params.startDate}
        stayEnd={params.endDate}
        price={this.state.reservationData.price}/>
      <InformationModal isOpen={this.state.message !== ''} message={this.state.message} handleOkay={this.closeInformationModal}/>
    </React.Fragment>);
  }
}