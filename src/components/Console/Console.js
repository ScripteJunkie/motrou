import React, { Component } from 'react';
import {Editor, EditorState} from 'draft-js'
import {getDefaultKeyBinding, KeyBindingUtil, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import './Console.css';

export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };

  }

  onChange = editorState => {const contentState = editorState.getCurrentContent(); this.sendQue(contentState); this.setState({editorState})};

  sendQue = (event) => {
    this.setState({username: event.target.value});
  }

  render() {
    return (
      <form>
        <input id="console" type="text" contenteditable="true" aria-placeholder="/commands" placeholder="/commands" onChange={this.sendQue}></input>
        <h1>Hello {this.state.username}</h1>
      </form>
    );
  }
}