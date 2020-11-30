import React, { createRef, useEffect, useState, useParams } from 'react';
import {
  Avatar,
  Grid,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';
import EditUsernameModal from '../EditUsernameModal/EditUsernameModal';
import EditPasswordModal from '../EditPasswordModal/EditPasswordModal';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../AppConfig.js'
import './style.css';

const UserOverviewEdit = (props) => {

  const inputFileRef = createRef(null);
  const [image, _setImage] = useState(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isPassModalOpen, setPassModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    console.log("yeet");
    console.log(props.username);
    axios.get(SERVER_ADDRESS + '/users/finduser/' + props.username)
      .then(({ data }) => {
        const userInfo = {
          username: data.username,
          password: data.password,
          isAdmin: data.isAdmin,
          joinDate: data.createdAt,
          profileImage: data.profileImage,
        };
        setUserInfo(userInfo);
        setImage(userInfo.profileImage + "?" + Date.now());
      }
      )
      .catch(err => console.log(err));
  }, []);

  // Function that cleans up avatar image
  const cleanup = () => {
    // URL.revokeObjectURL(image);
    // inputFileRef.current.value = null;
  };

  // Function that sets avatar image
  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
    // console.log(newImage);
  };

  // Takes uploaded img and passes it to setImg function to be set
  const handleOnImgChange = (event) => {
    const newImage = event.target?.files?.[0];
    // console.log(newImage);

    if (newImage) {
      const imgData = new FormData();
      imgData.append('myFile', newImage);
      axios.post(SERVER_ADDRESS + "/users/upload-profile/" + userInfo.username, imgData)
        .then(({ data }) => {
          // setImage(data);
        })
        .catch(err => console.log(err));
      setImage(URL.createObjectURL(newImage));
    }
  };

  // Handling when avatar image is clicked
  const handleAvatarClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(image);
    }
  };

  // Function the makes the axios call to delete an account from the db
  const handleDeleteAccount = () => {
    console.log(userInfo.username);
    axios.post(SERVER_ADDRESS + '/users/delete/' + userInfo.username)
      .then(console.log("Axios: user successfully deleted!"))
      .catch(err => (console.log(err)));
  };

  // Function that gets the join date of the user
  // const handleFetchJoinDate = () => {
  //   console.log(userInfo.username);
  //   axios.get(SERVER_ADDRESS +  '/users/finduser/join-date' + userInfo.username)
  //     .then(res => {
  //       const joinDate = res.createdAt;

  //     })
  // }

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
          <IconButton color="primary" >
            <input
              accept="image/*"
              // ref={inputFileRef}
              hidden
              id="avatar-image-upload"
              type="file"
              onChange={handleOnImgChange}
            />
            <label htmlFor="avatar-image-upload">
              <Avatar
                alt="Avatar"
                src={image}
                className="avatar"
              />
            </label>
          </IconButton>
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
            {"@" + userInfo.username}
          </Typography>
          {userInfo.isAdmin ? " 👑 " : ""}
          <Typography variant="body1">
            {/* CREATION DATE IS STORED IN USER SCHEMA */}
            {"Member since " + userInfo.joinDate}
          </Typography>
          <Typography variant="body1">
            {/* PULL FROM SERVER */}
            {userInfo.posts + " posts"}
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
        {/* Username */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="h6">Username</Typography>
            {userInfo.username}
          </Grid>
          <Grid item xs={4} />
        </Grid>

        {/* Edit Password */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="h6">Password</Typography>
            ********
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
    <div className="UserOverviewEdit">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={10}
      >
        <Grid item xs={1}>
          <NavBar
            isLandingPg={false}
            username={props.username}
          />
        </Grid>

        <Grid
          item
          container
          xs={11}
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
            UserOverviewEdit

            {/* User Info */}
            {renderUserGrid()}
          </Grid>
          <Grid item xs={1} />
        </Grid>

        {/* DELETE ACCOUNT MODAL */}
        <DeleteAccountModal
          username={userInfo.username}
          password={userInfo.password}
          delete={handleDeleteAccount}
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />

        {/* EDIT PASSWORD MODAL */}
        <EditPasswordModal
          username={userInfo.username}
          password={userInfo.password}
          isOpen={isPassModalOpen}
          onClose={() => setPassModalOpen(false)}
        />
      </Grid>
    </div>
  );

}

export { UserOverviewEdit };