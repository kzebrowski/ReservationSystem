import React, { Component } from 'react';
import RoomEditionForm from './RoomEditionForm';

export default class RoomEditor extends Component {
  displayName = RoomEditor.name;

  constructor(props) {
    super(props);
    
    this.state = {
      roomId: '',
      imageUrl: '', 
      formInitialValues: { 
        title: '',
        description: '',
        capacity: '',
        price: '',
        image: ''
      }
    };

    this.setFormInitialValues = this.setFormInitialValues.bind(this);
    this.fetchRoom = this.fetchRoom.bind(this);
  }

  componentDidMount() {    
    let params = this.props.match.params;
    
    if (params.id){
      this.fetchRoom(params.id);
    }
  } 

  async fetchRoom(id) {
    await fetch("/api/rooms/" + id)
      .then(response => response.json())
      .then(room => this.setFormInitialValues(room));
  }

  setFormInitialValues(room) {
    this.setState({
      formInitialValues: {
        title: room.title,
        description: room.description,
        capacity: room.capacity,
        price: room.price},
      roomId: room.id,
      imageUrl: room.imageUrl
      });
  }

  render() {
    return(
      <div className="administration-container">
        <RoomEditionForm roomId={this.state.roomId} imageUrl={this.state.imageUrl} initialValues={this.state.formInitialValues}/>
      </div>);
  }
}