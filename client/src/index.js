  
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import './tailwind.output.css';
import App from './App';
import { LandingPage } from './components/LandingPage/LandingPage';
import { UserSettingsPage } from '././components/UserSettingsPage/UserSettingsPage.jsx';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
    document.getElementById('root')
);
