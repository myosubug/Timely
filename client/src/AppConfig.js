import io from 'socket.io-client';

export const SERVER_ADDRESS = "http://104.207.142.118:5000"; //Define dynamic server address
export const socket = io.connect(SERVER_ADDRESS);
export let loggedInUser = {
    username: "",
    id: "",
    isAdmin: false,
    profileImage: ""
};
