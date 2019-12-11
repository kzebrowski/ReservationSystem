import React, { Component } from 'react';
import RoomEditionForm from './RoomEditionForm';

export default class RoomEditor extends Component {
  displayName = RoomEditor.name;

  render() {
    return(
      <div className="administration-container">
        <RoomEditionForm />
      </div>);
  }
}