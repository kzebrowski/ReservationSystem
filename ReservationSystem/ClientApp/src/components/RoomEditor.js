import React, { Component } from 'react';
import RoomEditionForm from './RoomEditionForm';
import InformationModal from './InformationModal';

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
      },
      informationModalData: {
        isOpen: false,
        message: ''
      }
    };

    this.setFormInitialValues = this.setFormInitialValues.bind(this);
    this.resetInformationFormData = this.resetInformationFormData.bind(this);
    this.openInformationForm = this.openInformationForm.bind(this);
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

  resetInformationFormData() {
    this.setState({informationModalData: {isOpen: false, message: ''}});
  }

  openInformationForm(message) {
    this.setState({informationModalData: {isOpen: true, message: message}});
  }

  render() {
    return(
      <div className="administration-container">
        <InformationModal
          isOpen={this.state.informationModalData.isOpen}
          message={this.state.informationModalData.message}
          handleOkay={this.resetInformationFormData}/>
        <RoomEditionForm
          roomId={this.state.roomId}
          imageUrl={this.state.imageUrl}
          initialValues={this.state.formInitialValues}
          showMessage={this.openInformationForm}/>
      </div>);
  }
}