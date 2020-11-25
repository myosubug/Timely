import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './tailwind.output.css';
import { LandingPage } from './components/LandingPage/LandingPage';


require('./AppConfig'); //Run the app config first

ReactDOM.render(
  <LandingPage />,
  document.getElementById('root')
);
