import React, { Component } from 'react';
import {Editor, EditorState} from 'draft-js'
import './App.css';
import {convertToRaw, convertFromRaw} from 'draft-js';
// let root = document.documentElement;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  
    const content = window.localStorage.getItem('content');

    // this.handleKeyCommand = this.handleKeyCommand.bind(this);
  
    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
   
  // document.onkeydown = keyDownEvent;
  // function keyDownEvent(e) {
  //   if (e.ctrlKey && e.key === 'x') {
  //     e.preventDefault();
  //     root.style.setProperty("--disp", 'block');
  // }
  // };
  }
  
  onChange = editorState => {const contentState = editorState.getCurrentContent(); this.saveContent(contentState); this.setState({editorState})};

  // keyBindingFn = (event) => {
  //   if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 75) {event.preventDefault(); return 'bbbold';}
  //   if (event.keyCode === 88) {event.preventDefault(); console.log("TAB"); return 'tab';}
  //   return getDefaultKeyBinding(event);
  // }

  // handleKeyCommand = (command) => {
  //   let newState;
  //   if (command === 'bbbold') {
  //     newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
  //   }

  //   if (command === 'tab') {
  //      newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
  //   }

  //   if (newState) {
  //     this.setState({ editorState: newState });
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // }

  saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  }

  render() {
    return (
      <div className="editor">
        <div id="margin"></div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          // handleKeyCommand={this.handleKeyCommand}
          // keyBindingFn={this.KeyBindingFn}
          />
      </div>
    );
  }
}

export default App;