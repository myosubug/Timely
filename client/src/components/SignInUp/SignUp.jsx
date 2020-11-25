import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../AppConfig.js'
import { loggedInUser } from '../../AppConfig.js'
import { setCookie } from '../../cookieHandler.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

        //Store in storage
        setCookie('id', loggedInUser.id, 10);
        setCookie('username', loggedInUser.username, 10);
        setCookie('isAdmin', loggedInUser.isAdmin, 10);
        setCookie('profileImage', loggedInUser.profileImage, 10);


        alert("your account is created and you are logged in now");
        props.setLoggedIn(true);
        props.onCancel();
      }).catch(err => {
        alert("Error occured while creating account, user name already exists or uername is too short");
      })
  }

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


SignUp.propTypes = {
  onCancel: PropTypes.func
};

export { SignUp };