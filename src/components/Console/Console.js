import React, { Component } from 'react';
//import {Editor, EditorState} from 'draft-js'
//import {getDefaultKeyBinding, KeyBindingUtil, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import './Console.css';
let root = document.documentElement;

export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
    
    document.onkeydown = keyDownEvent;
    function keyDownEvent(e) {
      if (e.ctrlKey && e.key === 'x') {
        e.preventDefault();
        console.log("open");
        root.style.setProperty("--disp", 'flex');
        document.getElementById("console").focus();
    }
    };

    document.body.addEventListener('click', function (event) {
      if (document.getElementById("console").contains(event.target) || document.getElementById("options").contains(event.target)) {
      } else {
        document.getElementById("console").value = "";
        root.style.setProperty("--disp", 'none');
            }
  });
  }

  onChange = editorState => {const contentState = editorState.getCurrentContent(); this.sendQue(contentState); this.setState({editorState})};

  
  sendQue = (event) => {
    // remove .toUpperCase for case sensitive
    this.setState({value: event.target.value});
    var input, txt, ul, li, a, i, txtValue;
    input = document.getElementById("console");
    if (input.value !== "") {
      function filter(length) {
        return input.value.toUpperCase().slice(0, length);
      }
      txt = input.value.toUpperCase();
      ul = document.getElementById("options");
      li = ul.getElementsByTagName("li");
      console.log(txt.length, filter(txt.length));
      ul.style.display = "none";
      if (input.value === "/all") {
        var link = document.createElement('a');
        var entry = document.createElement('li');
        entry.style.display = "grid";
        link.appendChild(document.createTextNode("all"));
        link.href = "/";
        entry.appendChild(link);
        ul.appendChild(entry);
        ul.style.display = "grid";
      }
      else {
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.substr(0, txt.length).toUpperCase() === txt) {
                li[i].style.display = "grid";
                ul.style.display = "grid";
                console.log('not empty!');
            } else {
                li[i].style.display = "none";
            }
        }
      }
    }
    else {
      document.getElementById("options").style.display = "none";
      console.log('empty!');
    }
  }

  render() {
    return (
        <form id="console-cont">
          <input id="console" type="text" contentEditable="true" aria-placeholder="Use a component or /commands" placeholder="Use a component or /commands" autoFocus autoComplete="off" onChange={this.sendQue}></input>
          <h1>Hello {this.state.username}</h1>
          <ul id="options">
            <li><a href="./404.html">/themes (WIP)</a></li>
            <li><a href="./404.html">/login (WIP)</a></li>
            <li><a href="./404.html">/files (WIP)</a></li>
            <li><a href="./404.html">/import (WIP)</a></li>
            <li><a href="./404.html">/export (WIP)</a></li>
            <li><a href="./404.html">/toolbox (WIP)</a></li>
            <li><a href="./404.html">/commands (WIP)</a></li>
            <li><a href="./404.html">/all (WIP)</a></li>
          </ul>
        </form>
    );
  }
}