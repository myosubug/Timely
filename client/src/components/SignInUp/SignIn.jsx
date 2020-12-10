import React, { useState } from 'react';
import {
  CssBaseline,
  TextField,
  Grid,
  Container
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SERVER_ADDRESS, loggedInUser } from '../../AppConfig.js'
import styles from './Sign.module.css';

export default function SignIn(props) {
  const [isSignInOkay, setIsSignInOkay] = useState(true);

  function handleSignIn(e) {
    e.preventDefault();
    const signInRequest = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }
    axios.post(SERVER_ADDRESS + "/users/signin", signInRequest)
      .then(res => {
        loggedInUser.id = res.data.userInfo._id;
        loggedInUser.username = res.data.userInfo.username;
        loggedInUser.isAdmin = res.data.userInfo.isAdmin;
        loggedInUser.profileImage = res.data.userInfo.profileImage;

        //Set the token
        const token = res.data.token;
        localStorage.setItem('token', token);

        setIsSignInOkay(true);
        props.setLoggedIn(true);
        props.onCancel();
      }).catch(err => {
        setIsSignInOkay(false);
      })

  }

  return (
    <Container id={styles.container} maxWidth="sm">
      <CssBaseline />
      <div>
        <div className="flex justify-center text-2xl text-gray-700 rounded-full pb-4">
          <p className="font-medium "> Sign In </p>
        </div>
        <form onSubmit={handleSignIn} noValidate>
          <Grid container>
            <Grid item xs={12}>
              <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="email" autoComplete="email" autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            </Grid>
            {!isSignInOkay &&
              <Grid item xs={12}>
                <Alert variant="outlined" severity="error">
                  Your username or password is wrong, please try again.
                </Alert>
              </Grid>
            }
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
                <p style={{ padding: "0.1rem" }}> Sign In </p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

SignIn.propTypes = {
  onCancel: PropTypes.func,
};


export { SignIn };