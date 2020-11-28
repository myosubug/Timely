
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { getCookie, setCookie } from './cookieHandler.js';
import App from './App';

import './index.css';
import './tailwind.output.css';


const config = require('./AppConfig'); //Run the app config first

const init = async () => {
  //Check if we have username in the cookie, and if so, assume that the user is logged in
  if (getCookie('id') !== null) {

    const id = sessionStorage.getItem('id');

    //Set the sessionStorage values
    sessionStorage.setItem('id', id);

    await config.populateUserInfo(id);
  }

  //If we get to this point, then that means that the cookie has expired, but we are still in session, so check if we have a session, and if we do, update the cookie again
  else if (sessionStorage.getItem('id') !== null) {

    const id = sessionStorage.getItem('id');
    //Set the cookie values again
    setCookie('id', id, 10);

    await config.populateUserInfo(id);
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


