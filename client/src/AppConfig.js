import io from 'socket.io-client';
import axios from 'axios';
import { eraseCookie } from './cookieHandler.js';

export const SERVER_ADDRESS = "http://localhost:5000"; //Define dynamic server address
export const socket = io.connect(SERVER_ADDRESS);
export let loggedInUser = {
    username: "",
    id: "",
    isAdmin: false,
    profileImage: ""
};

//Populates the loggedInUser object based on the username
export const populateUserInfo = async (id) => {
    await axios.get(SERVER_ADDRESS + "/users/" + id)
        .then(({ data }) => {
            loggedInUser.username = data.username;
            loggedInUser.id = data._id;
            loggedInUser.isAdmin = data.isAdmin;
            loggedInUser.profileImage = data.profileImage;
        })
        .catch(err => console.log(err));
}

export const resetLoggedInUser = () => {
    loggedInUser = {
        username: "",
        id: "",
        isAdmin: false,
        profileImage: ""
    };
}


