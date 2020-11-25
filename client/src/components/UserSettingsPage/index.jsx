import React, { Component } from 'react';
import {
  Avatar,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteAccountModal from '../DeleteAccountModal';
import EditEmailModal from '../EditEmailModal';
import EditUsernameModal from '../EditUsernameModal';
import EditPasswordModal from '../EditPasswordModal';
import * as avatarImg from './../../imgs/patrick.jpg';
import './style.css';

export class UserSettingsPage extends Component {
  static propTypes = {
    // Could probably make some sort of user data structure to be passed in
    // Rather than passing in props for each field
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    profileImage: PropTypes.string.isRequired,

    joinDate: PropTypes.string.isRequired,
    posts: PropTypes.number.isRequired,
    // email: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isDeleteOpen: false,
      // isEditEmailOpen: false,
      isEditUserOpen: false,
      isEditPassOpen: false,
    };
  }

  // DELETE MODAL STATE HANDLER
  openDeleteModal = () => {
    this.setState({ 
      isDeleteOpen: true });
  };

  closeDeleteModal = () => {
    this.setState({
      isDeleteOpen: false,
    });
  }

  // EDIT EMAIL STATE HANDLER
  openEmailModal = () => {
    this.setState({ 
      isEditEmailOpen: true });
    };
    
    closeEmailModal = () => {
      this.setState({
        isEditEmailOpen: false,
      });
    }

    // EDIT USERNAME STATE HANDLER
  openUserModal = () => {
    this.setState({ 
      isEditUserOpen: true });
    };
    
    closeUserModal = () => {
      this.setState({
        isEditUserOpen: false,
      });
    }
    
    // EDIT PASSWORD STATE HANDLER
  openPassModal = () => {
    this.setState({ 
      isEditPassOpen: true });
    };
    
    closePassModal = () => {
      this.setState({
        isEditPassOpen: false,
      });
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
            src={avatarImg}
            className="avatar"
          />
          {/* TODO Change profile pic button*/}
        </Grid>

        <Grid item xs={3} className="DeleteAccount">
          <Button
            variant="contained"
            className="DeleteAccountButton"
            onClick={this.openDeleteModal}
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
          <Typography variant="h5" component="span">
            {"@" + this.props.username}
          </Typography>
            {this.props.isAdmin ? " 👑 " : ""}
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
            <Typography variant="h6">Email</Typography>
            {this.props.email}
          </Grid>

          <Grid item xs={4}>
            <Button
              variant="contained"
              className="EditEmailButton"
              onClick={this.openEmailModal}
              size="medium"
            >
              Edit
            </Button>
          </Grid>
        </Grid>

        {/* Edit Username */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="h6">Username</Typography>
            {this.props.username}
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className="EditUsernameButton"
              onClick={this.openUserModal}
              size="medium"
            >
              Edit
            </Button>
          </Grid>
        </Grid>

        {/* Edit Password */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="h6">Password</Typography>
            {this.props.password}
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className="EditPasswordButton"
              onClick={this.openPassModal}
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

        {/* DELETE ACCOUNT MODAL */}
        <DeleteAccountModal
          username={this.props.username}
          password={this.props.password}
          delete={() => {}}
          isOpen={this.state.isDeleteOpen}
          onClose={this.closeDeleteModal}
        />

        {/* EDIT EMAIL MODAL */}
        {/* <EditEmailModal
          username={this.props.username}
          password={this.props.password}
          email={this.props.email}
          update={() => {}}
          isOpen={this.state.isEditEmailOpen}
          onClose={this.closeEmailModal}
        /> */}

        {/* EDIT USERNAME MODAL */}
        <EditUsernameModal
          username={this.props.username}
          password={this.props.password}
          username={this.props.username}
          update={() => {}}
          isOpen={this.state.isEditUserOpen}
          onClose={this.closeUserModal}
        />

        {/* EDIT PASSWORD MODAL */}
        <EditPasswordModal
          username={this.props.username}
          password={this.props.password}
          update={() => {}}
          isOpen={this.state.isEditPassOpen}
          onClose={this.closePassModal}
        />
      </div>
    );
  }
}

