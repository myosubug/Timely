import io from 'socket.io-client';
import axios from 'axios';

export const SERVER_ADDRESS = "http://localhost:5000"; //Define dynamic server address
export const socket = io.connect(SERVER_ADDRESS);
export let loggedInUser = {
    username: "",
    id: "",
    isAdmin: false,
    profileImage: ""
};

//Populates the loggedInUser object based on the username
export const populateUserInfo = async (token) => {
    await axios.post(SERVER_ADDRESS + "/users/token", { "token": token })
        .then(({ data }) => {
            if (data.isValid) {
                loggedInUser.username = data.object.username;
                loggedInUser.id = data.object._id;
                loggedInUser.isAdmin = data.object.isAdmin;
                loggedInUser.profileImage = data.object.profileImage;

                const new_token = data.token;
                localStorage.setItem('token', new_token);
            }
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

    localStorage.clear();
}


