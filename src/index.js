import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App url='https://api.hatchways.io/assessment/students'/>
  </React.StrictMode>,
  document.getElementById('root')
);
