import React, { Component } from 'react';

export default class Room extends Component {
    displayName = Room.displayName;

    render() {
        return this.props.title;
    }
}