import io from 'socket.io-client';
import { getCookie } from './cookieHandler.js';

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
}
