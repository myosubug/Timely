import React, { useState } from 'react';
import {
  CssBaseline,
  TextField,
  Grid,
  Container
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SERVER_ADDRESS, loggedInUser } from '../../AppConfig.js'
import styles from './Sign.module.css';
export default function SignUp(props) {
  const [errorMsg, setErrorMsg] = useState("");

  function handleSignUp(e) {
    e.preventDefault();
    const signUpRequest = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      password2: document.getElementById('password2').value
    }


    if (signUpRequest.username === "") {
      setErrorMsg("Username cannot be empty");
      return;
    }


    //Validate username
    if (signUpRequest.username.split(' ').length > 1) {
      setErrorMsg("Username cannot contain spaces");
      return;
    }
    //Check if username contains any characters that are not whitelisted
    else if (signUpRequest.username.match(/[^a-z^A-Z^0-9_]/)) {
      setErrorMsg("Username can only contain characters from a-z, numbers, or underscores");
      return;
    }

    else if (signUpRequest.username.length > 15) {
      setErrorMsg("Username must be less than 16 characters");
      return;
    }


    //Validate password
    if (signUpRequest.password.length < 3) {
      setErrorMsg("Password must be at least 3 characters long");
      return;
    }
    else if (signUpRequest.password !== signUpRequest.password2) {
      setErrorMsg("Passwords do not match");
      return;
    }

    axios.post(SERVER_ADDRESS + "/users/signup", signUpRequest)
      .then(res => {
        loggedInUser.id = res.data.userInfo._id;
        loggedInUser.username = res.data.userInfo.username;
        loggedInUser.isAdmin = res.data.userInfo.isAdmin;
        loggedInUser.profileImage = res.data.userInfo.profileImage;

        //Set the token
        const token = res.data.token;
        localStorage.setItem('token', token);
        props.setLoggedIn(true);
        props.onCancel();
      }).catch(err => {
        setErrorMsg("Username is already taken")
      })

  }

  //Renders the error message if anything is wrong with the signup
  const renderError = () => {
    if (errorMsg !== "") {
      return (
        <Grid item xs={12}>
          <Alert xs={12} variant="outlined" severity="error">
            {errorMsg}
          </Alert>
        </Grid>
      );
    }
    return (
      <Grid item xs={12}>
        <Alert variant="outlined" severity="info">
          Your username and password must be at least 3 characters long.
      </Alert>
      </Grid>
    );
  }

  return (
    <Container id={styles.container} maxWidth="sm">
      <CssBaseline />
      <div>
        <div className="flex justify-center text-2xl text-gray-700 rounded-full pb-4">
          <p className="font-medium "> Sign Up </p>
        </div>
        <form onSubmit={handleSignUp} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth id="username" label="Username" name="email" autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password2" label="Repeat password" type="password" id="password2" autoComplete="current-password" />
            </Grid>
            {renderError()}
          </Grid>
          <div>
            <div className={styles.buttonDiv}>
              <button
                type="button"
                onClick={props.onCancel}
                className="button-cancel text-white text-2xl font-semibold mb-2 text-center rounded cursor-pointer shadow-md"
                style={{ height: "3rem", padding: " 0 1rem 0 1rem", margin: "10px" }}>
                <p style={{ padding: "0.1rem" }}> Cancel </p>
              </button>

              <button
                type="submit"
                className="button text-white text-2xl font-semibold mb-2 text-center rounded cursor-pointer shadow-md"
                style={{ height: "3rem", padding: " 0 1rem 0 1rem", margin: "10px" }}>
                <p style={{ padding: "0.1rem" }}> Sign Up </p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );

}

SignUp.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export { SignUp };