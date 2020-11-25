import io from 'socket.io-client';
import { getCookie, setCookie } from './cookieHandler.js';

export const SERVER_ADDRESS = "http://localhost:5000"; //Define dynamic server address
export const socket = io.connect(SERVER_ADDRESS);
export let loggedInUser = {
    username: "",
    id: "",
    isAdmin: false,
    profileImage: ""
};


//Check if we have username in the cookie, and if so, assume that the user is logged in
if (getCookie('username') !== null) {
    loggedInUser.username = getCookie('username');
    loggedInUser.id = getCookie('id');
    loggedInUser.isAdmin = getCookie('isAdmin');
    loggedInUser.profileImage = getCookie('profileImage');

    //Set the sessionStorage values
    sessionStorage.setItem('id', loggedInUser.id);
    sessionStorage.setItem('username', loggedInUser.username);
    sessionStorage.setItem('isAdmin', loggedInUser.isAdmin);
    sessionStorage.setItem('profileImage', loggedInUser.profileImage);
}

//If we get to this point, then that means that the cookie has expired, but we are still in session, so check if we have a session, and if we do, update the cookie again
else if (sessionStorage.getItem('username') !== null) {
    loggedInUser.username = sessionStorage.getItem('username');
    loggedInUser.id = sessionStorage.getItem('id');
    loggedInUser.isAdmin = sessionStorage.getItem('isAdmin');
    loggedInUser.profileImage = sessionStorage.getItem('profileImage');

    //Set the cookie values again
    setCookie('id', loggedInUser.id, 10);
    setCookie('username', loggedInUser.username, 10);
    setCookie('isAdmin', loggedInUser.isAdmin, 10);
    setCookie('profileImage', loggedInUser.profileImage, 10);
}
