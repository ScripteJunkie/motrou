import React, { Component } from 'react';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js'
import './App.css';
import {convertToRaw, convertFromRaw} from 'draft-js';

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
  
  onChange = editorState => {const contentState = editorState.getCurrentContent(); this.saveContent(contentState); this.setState({editorState})
  if (document.activeElement.className === 'notranslate public-DraftEditor-content') {
    document.getElementById('styling').style.display = "flex";
  }
  else {
    document.getElementById('styling').style.display = "none";
  }
};

  saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  _onListClick() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  }

  _onTitleClick() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'header-two'));
  }

  _onSearchClick() {
    document.documentElement.style.setProperty("--disp", 'flex');
  }

  onTogglePopover = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="editor">
        <div id="styling">
          <div id="buttons">
            <button onMouseDown={this.onTogglePopover} onClick={this._onBoldClick.bind(this)}>
              <span className="material-icons">
                format_bold
              </span>
            </button>
            <button onMouseDown={this.onTogglePopover} onClick={this._onItalicClick.bind(this)}>
              <span class="material-icons">
                format_italic
              </span>
            </button>
            <button onMouseDown={this.onTogglePopover} onClick={this._onUnderlineClick.bind(this)}>
              <span class="material-icons">
                format_underlined
              </span>
            </button>
            <button onMouseDown={this.onTogglePopover} onClick={this._onListClick.bind(this)}>
              <span class="material-icons">
                format_list_bulleted
              </span>
            </button>
            <button onMouseDown={this.onTogglePopover} onClick={this._onTitleClick.bind(this)}>
              <span className="material-icons">
              title
              </span>
            </button>
            <button onClick={this._onSearchClick.bind(this)}>
              <br></br>
              <span className="material-icons">
              search
              </span>
            </button>
          </div>
        </div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          />
      </div>
    );
  }
}

export default App;