import React, { Component } from 'react';
import './Swap.css';
let root = document.documentElement;
var themeColor = 'light';

export default class Swap extends Component {
    constructor(props) {
        super(props);
        this.state = { };
      
        const theme = window.localStorage.getItem('theme');
        if (theme === "dark") {
            root.style.setProperty("--color-primary", 'black');
            root.style.setProperty("--color-accent", '#131313');
            root.style.setProperty("--color-font", 'white');
            themeColor = 'dark';
        } else {
            root.style.setProperty("--color-primary", 'white');
            root.style.setProperty("--color-accent", '#F0F0F0');
            root.style.setProperty("--color-font", 'black');
            themeColor = 'light';
        }
      }
    handleClick = () => {
        // light or dark theme
        if (themeColor === 'dark') {
            root.style.setProperty("--color-primary", 'white');
            root.style.setProperty("--color-accent", '#F0F0F0');
            root.style.setProperty("--color-font", 'black');
            this.saveTheme('light');
        }
        else {
            root.style.setProperty("--color-primary", 'black');
            root.style.setProperty("--color-accent", '#131313');
            root.style.setProperty("--color-font", 'white');
            this.saveTheme('dark');
        }
    };

    saveTheme = (theme) => {
        window.localStorage.setItem('theme', theme);
        themeColor = theme;
      }

  render() {
    return (
      <div className="swap" onClick={this.handleClick}>
      </div>
    );
  }
}