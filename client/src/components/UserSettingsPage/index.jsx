import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteAccountModal from '../DeleteAccountModal';
import EditUsernameModal from '../EditUsernameModal';
import EditPasswordModal from '../EditPasswordModal';
import * as avatarImg from './../../imgs/patrick.jpg';
import './style.css';

const UserSettingsPage = (props) => {
  UserSettingsPage.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    profileImage: PropTypes.string.isRequired,

    joinDate: PropTypes.string.isRequired,
    posts: PropTypes.number.isRequired,
  };

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isPassModalOpen, setPassModalOpen] = useState(false);
  // const [isEmailModalOpen, setEmailModalOpen] = useState(false);

  // Function the makes the axios call to delete an account from the db
  const handleDeleteAccount = () => {};

  // Function that makes the axios call to update the specified account's username
  const handleUpdateUsername = () => {};

  // Function that makes the axios call to update the user's password
  const handleUpdatePassword = () => {};

  // Renders the profile pic and the delete account button
  const renderProfileGrid = () => {
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
            onClick={() => setDeleteModalOpen(true)}
            size="medium"
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    );
  }

  // Renders the users information
  const renderUserGrid = () => {
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
            {"@" + props.username}
          </Typography>
            {props.isAdmin ? " 👑 " : ""}
          <Typography variant="body1">
            {"Member since " + props.joinDate}
          </Typography>
          <Typography variant="body1">
            {props.posts + " posts"}
          </Typography>
        </Grid>

        <Grid item xs className="UserActions">
          {renderUserActions()}
        </Grid>
      </Grid>
    )
  }

  // Renders the action buttons: edit username, edit password
  const renderUserActions = () => {
    return (
      <div>
        {/* Edit Email */}
        {/* <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="h6">Email</Typography>
            {props.email}
          </Grid>

          <Grid item xs={4}>
            <Button
              variant="contained"
              className="EditEmailButton"
              onClick={openEmailModal}
              size="medium"
            >
              Edit
            </Button>
          </Grid>
        </Grid> */}

        {/* Edit Username */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="h6">Username</Typography>
            {props.username}
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className="EditUsernameButton"
              onClick={() => setUserModalOpen(true)}
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
            {props.password}
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className="EditPasswordButton"
              onClick={() => setPassModalOpen(true)}
              size="medium"
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

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
          {/* Profile picture Grid and delete account button */}
          {renderProfileGrid()}
        </Grid>
        <Grid item xs={7} className="UserInfoGrid">
          {/* User Info */}
          {renderUserGrid()}
        </Grid>
        <Grid item xs={1} />
      </Grid>

      {/* DELETE ACCOUNT MODAL */}
      <DeleteAccountModal
        username={props.username}
        password={props.password}
        delete={handleDeleteAccount}
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />

      {/* EDIT EMAIL MODAL */}
      {/* <EditEmailModal
        username={props.username}
        password={props.password}
        email={props.email}
        update={() => {}}
        isOpen={state.isEditEmailOpen}
        onClose={closeEmailModal}
      /> */}

      {/* EDIT USERNAME MODAL */}
      <EditUsernameModal
        username={props.username}
        password={props.password}
        update={handleUpdateUsername}
        isOpen={isUserModalOpen}
        onClose={() => setUserModalOpen(false)}
      />

      {/* EDIT PASSWORD MODAL */}
      <EditPasswordModal
        username={props.username}
        password={props.password}
        update={handleUpdatePassword}
        isOpen={isPassModalOpen}
        onClose={() => setPassModalOpen(false)}
      />
    </div>
  );

}

export { UserSettingsPage };