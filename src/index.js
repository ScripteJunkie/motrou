import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/Editor/App';
import Swap from './components/Swap/Swap';
import Console from './components/Console/Console';
//import Documents from './components/Documents/Documents';
//import Split from './components/Split/Split';
ReactDOM.render(
  <React.StrictMode>
    <Console />
    <App />
    <Swap />
  </React.StrictMode>,
  document.getElementById('root')
);