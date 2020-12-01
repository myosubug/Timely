import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../AppConfig.js'
import { loggedInUser, populateUserInfo } from '../../AppConfig.js'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function SignUp(props) {
  const [isSignUpOkay, setIsSignUpOkay] = useState(true);
  const classes = useStyles();

  function handleSignUp(e) {
    e.preventDefault();
    const signUpRequest = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
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
        setIsSignUpOkay(true);
        props.setLoggedIn(true);
        props.onCancel();
      }).catch(err => {
        setIsSignUpOkay(false);
      })
  }
  if (!isSignUpOkay) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSignUp} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth id="username" label="User Name" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
              </Grid>
              <Alert item xs={12} variant="outlined" severity="error">
                Error occured while creating account, the user name already exists or uername is too short.
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign Up
                </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" onClick={props.onCancel} className={classes.submit}>
                Cancel
                </Button>
            </Grid>
          </form>
        </div>
      </Container>
    );
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form onSubmit={handleSignUp} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth id="username" label="User Name" name="email" autoComplete="email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Sign Up
                  </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" color="primary" onClick={props.onCancel} className={classes.submit}>
                  Cancel
                  </Button>
              </Grid>
            </form>
          </div>
        </Container>
      );
    }
}


SignUp.propTypes = {
  onCancel: PropTypes.func
};

export { SignUp };