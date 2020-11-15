  
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserSettingsPage } from './components/UserSettingsPage';
import { UserOverviewPage } from './components/UserOverviewPage';

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
  
//   <UserOverviewPage
//     username="notPavol"
//     memberStatus="November 2020"
//     posts={123}
//     email="notpavol@gmail.com"
//     postActivity="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis facilisis nisi, suscipit vehicula sem. Phasellus eu quam odio. Quisque eget enim in massa cursus tincidunt vel a nisl. Integer sollicitudin dolor eget ligula commodo gravida. Quisque et condimentum elit. Mauris venenatis suscipit finibus. Praesent et lectus quis odio rutrum placerat. Curabitur eget commodo ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non urna non tortor consectetur elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci at magna lobortis facilisis.

// Curabitur condimentum egestas libero. Aliquam in nisi pellentesque, fringilla justo consequat, scelerisque arcu. Sed consectetur quam dictum dui tempor placerat. Donec aliquam risus in nisi ultricies, quis lobortis dui venenatis. Fusce velit sapien, gravida nec ante vitae, ullamcorper aliquet lorem. Vivamus quis libero quis dolor finibus convallis et vitae dolor. Curabitur sollicitudin ipsum at velit efficitur porta. In eget nisl quis purus blandit interdum. Aliquam sed purus id eros suscipit tincidunt. Donec accumsan facilisis varius. Phasellus pulvinar orci vitae ligula molestie lacinia. Cras eleifend egestas nunc, vitae finibus urna efficitur vitae.

// Aliquam id finibus diam. Maecenas tincidunt bibendum facilisis. Ut tincidunt magna ultrices, lacinia ex et, consectetur nisi. Cras feugiat rhoncus iaculis. Nam consectetur suscipit dignissim. Integer eu mauris eu tortor pellentesque aliquam. Ut arcu leo, imperdiet nec gravida id, posuere non arcu. Phasellus malesuada at neque eget convallis. Vestibulum eget arcu ullamcorper, cursus turpis eget, aliquam odio.
// "
//     isAdmin={true}
//     userId="notPavolId"
//   />,

  document.getElementById('root')
);