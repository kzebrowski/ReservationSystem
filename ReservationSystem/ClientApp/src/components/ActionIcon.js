import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ActionIcon extends Component {
  displayName = ActionIcon.name;

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.itemId);
  }

  render() {
    return <FontAwesomeIcon icon={this.props.icon} style={{cursor: "pointer"}} onClick={this.handleClick}/>;
  }
}