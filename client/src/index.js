  
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserSettingsPage } from './components/UserSettingsPage';

ReactDOM.render(
  <UserSettingsPage 
    username="notPavol"
    memberStatus="November 2020"
    posts={123}
    email="notpavol@gmail.com"
    password="ilovespongebob"
    isAdmin={true}
    userId="notPavolId"
  />,
  document.getElementById('root')
);