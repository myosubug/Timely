  
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './tailwind.output.css';


require('./AppConfig'); //Run the app config first

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
    document.getElementById('root')
);
