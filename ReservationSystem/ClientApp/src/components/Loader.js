import React, { Component } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default class Loader extends Component {
  displayName = Loader.name;

  loaderStyle = `
    height: 100px;
    width: 100px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 50%;
    margin-top: -50px;
    z-index: 100;`;

    render() {
      if (this.props.isLoading) {
        return (
          <React.Fragment>
            <div className="loading-fog"/>
            <ClipLoader
              css={this.loaderStyle}
              sizeUnit={"px"}
              size={105}
              color={'#000000'}
              loading={true}
            />
          </React.Fragment>);
      }
  
      return null;
    }
}