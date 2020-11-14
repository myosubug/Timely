import React, { Component } from 'react';
import {
  Avatar,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import './style.css';

export class UserSettingsPage extends Component {
  static propTypes = {
    // Could probably make some sort of user data structure to be passed in
    // Rather than passing in props for each field
    username: PropTypes.string.isRequired,
    memberStatus: PropTypes.string.isRequired,
    posts: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditEmailOpen: false,
      isEditUserOpen: false,
      isEditPassOpen: false,
    };
  }

  handleOnDeleteClick = () => {
    console.log("delete clicked")
  };

  handleOnEditEmailClick = () => {
    console.log("edit email clicked")
  }

  handleOnEditUserClick = () => {
    console.log("edit user clicked")
  }

  renderProfileGrid = () => {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={9} className="ProfilePic">
          <Avatar
            alt="Patrick"
            src="./suprised_patrick.png"
            className="avatar"
          />
          {/* TODO Change profile pic button*/}
        </Grid>
        <Grid item xs={3} className="DeleteAccount">
          <Button
            variant="contained"
            className="DeleteAccountButton"
            onClick={this.handleOnDeleteClick}
            size="medium"
          >
            Delete
        </Button>
        </Grid>
      </Grid>
    );
  }

  renderUserGrid = () => {
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        <Grid item xs className="UserInfo">
          <Typography variant="h5">
            {"@" + this.props.username}
          </Typography>
          <Typography variant="body1">
            {"Member since " + this.props.memberStatus}
          </Typography>
          <Typography variant="body1">
            {this.props.posts + " posts"}
          </Typography>
        </Grid>
        <Grid item xs className="UserActions">
          {this.renderUserActions()}
        </Grid>
      </Grid>
    )
  }

  renderUserActions = () => {
    return (
      <div>
        {/* Edit Email */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="body1">Email</Typography>
            {this.props.email}
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className="EditEmailButton"
              onClick={this.handleOnEditEmailClick}
              size="medium"
            >
              Edit
          </Button>
          </Grid>
        </Grid>
        
        {/* Edit Username */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="body1">Username</Typography>
            {this.props.username}
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className="EditUsernameButton"
              onClick={this.handleOnEditUserClick}
              size="medium"
            >
              Edit
            </Button>
          </Grid>
        </Grid>
        {/* Edit Password */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="body1">Password</Typography>
            {this.props.password}
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className="EditUsernameButton"
              onClick={this.handleOnEditUserClick}
              size="medium"
            >
              Edit
        </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div className="UserSettingsPage">
        <Grid container className="header">
          <Typography variant="h4" align="center" className="headerTitle">
            User Settings Page
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          className="ButtonGrid"
        >
          <Grid item xs={1} />
          <Grid item xs={3} className="ProfileGrid">
            {/* 1. Profile picture Grid and delete account button */}
            {this.renderProfileGrid()}
          </Grid>
          <Grid item xs={7} className="UserInfoGrid">
            {/* 2. User Info */}
            {this.renderUserGrid()}
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
    );
  }
}

