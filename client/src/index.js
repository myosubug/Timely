import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PostCreator } from './components/PostCreator/PostCreator';
import { Post } from './components/Post/Post';

ReactDOM.render(
  <Post />,
  document.getElementById('root')
);
