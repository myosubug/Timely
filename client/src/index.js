  
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import { UserSettingsPage } from '././components/UserSettingsPage';
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
