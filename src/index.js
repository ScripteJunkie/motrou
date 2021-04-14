import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/Editor/App';
import Swap from './components/Swap/Swap';
import Split from './components/Split/Split';
import reportWebVitals from './tests/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Swap />
    <Split />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();