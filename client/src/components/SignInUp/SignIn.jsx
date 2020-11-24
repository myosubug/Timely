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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));


export default function SignIn(props) {
  const classes = useStyles();

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
        alert("login successful");
        props.setLoggedIn(true);
        props.onCancel();
      }).catch(err => {
        console.log(err);
        alert("username or password is wrong!");
      })

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSignIn} className={classes.form} noValidate>
          <TextField variant="outlined" margin="normal" required fullWidth id="username" label="User Name" name="email" autoComplete="email" autoFocus />
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign In
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

SignIn.propTypes = {
  onCancel: PropTypes.func
};


export { SignIn };