
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './index.css';
import './tailwind.output.css';


const config = require('./AppConfig'); //Run the app config first

const init = async () => {
  //Check if we have a a token
  if (localStorage.getItem('token')) {
    await config.populateUserInfo(localStorage.getItem('token'));
  }


  //Render only after we have our data
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
}


init();


