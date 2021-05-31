import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/Editor/App';
import Swap from './components/Swap/Swap';
import Console from './components/Console/Console';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Swap />
    <Console />
  </React.StrictMode>,
  document.getElementById('root')
);