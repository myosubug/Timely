import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import {ConfirmationPage} from './components/confirmationPage';

ReactDOM.render(
  <ConfirmationPage userselected="teasdasdasdst" adminpass="test1234" pagetype ="promote"/>,
  document.getElementById('root')
);
