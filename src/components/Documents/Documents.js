import React, { Component } from 'react';
import './Documents.css';
let root = document.getElementById("doc");

export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
    handleClick = () => {
      // minimize
      root.style.setProperty("height", '15px');
      root.style.setProperty("width", '15px');
    };
  render() {
    return (
      <div id="doc" className="documents">
        <div className="close" onClick={this.handleClick}></div>
      </div>
    );
  }
}