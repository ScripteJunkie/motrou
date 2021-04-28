import React, { Component } from 'react';
import './Documents.css';

export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardVisible: true,
      display: "hidden",
     };
  }
    handleClick = () => this.setState(state => ({
      cardVisible: !state.cardVisible,
    }));

  render() {
    return (
      <div id="doc" display={this.state.display} className="documents">
        <div className="close" onClick={this.handleClick}></div>
      </div>
    );
  }
}