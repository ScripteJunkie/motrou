import React, { Component } from 'react';
import {Editor, EditorState} from 'draft-js'
import './App.css';
import {getDefaultKeyBinding, KeyBindingUtil, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  
    const content = window.localStorage.getItem('content');
  
    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
  }
  
  onChange = editorState => {const contentState = editorState.getCurrentContent(); this.saveContent(contentState); this.setState({editorState})};

  keyBindingFn = (event) => {
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 75) {event.preventDefault(); return 'bbbold';}
    if (event.keyCode === 9) {event.preventDefault(); return 'tab';}
    return getDefaultKeyBinding(event);
  }

  handleKeyCommand = (command) => {
    let newState;
    if (command === 'bbbold') {
      newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
    }

    if (command === 'tab') {
      newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
    }

    if (newState) {
      this.setState({ editorState: newState });
      return 'handled';
    }
    return 'not-handled';
  }

  saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  }

  render() {
    return (
      <div className="editor">
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.KeyBindingFn}
          />
      </div>
    );
  }
}

export default App;