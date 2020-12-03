import React, { createRef, useEffect, useState, useParams } from 'react';
import {
  Avatar,
  Grid,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import BanUserModal from './AdminPopUps/BanUserModal';
import AdminEditPasswordModal from './AdminPopUps/AdminEditPasswordModal';
import DemoteAdminModal from './AdminPopUps/DemoteAdminModal';
import PromoteUserModal from './AdminPopUps/PromoteUserModal';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../AppConfig.js'
import './style.css';

const UserOverviewAdmin = (props) => {

  const inputFileRef = createRef(null);
  const [image, _setImage] = useState(null);
  const [postNum, setPostNum] = useState(0);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDemoteModalOpen, setDemoteModalOpen] = useState(false);
  const [isPromoteModalOpen, setPromoteModalOpen] = useState(false);
  const [isPassModalOpen, setPassModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // Get logged in user's info
    axios.get(SERVER_ADDRESS + '/users/finduser/' + props.username)
      .then(({ data }) => {
        const userInfo = {
          username: data.username,
          password: data.password,
          isAdmin: data.isAdmin,
          joinDate: data.createdAt,
          profileImage: data.profileImage,
        };

        // Update state
        setUserInfo(userInfo);
        setImage(userInfo.profileImage + "?" + Date.now());

        // Get user's number of posts
        axios.get(SERVER_ADDRESS + '/users/numposts/' + userInfo.username)
          .then(res => {
            setPostNum(res.data);
          })
          .catch(err => (console.log(err)));

      })
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

  // Function that makes the axios call to ban an account from the db
  const handleDeleteAccount = () => {
    axios.post(SERVER_ADDRESS + '/users/delete/' + userInfo.username)
      .then(console.log("Axios: user successfully deleted!"))
      .catch(err => (console.log(err)));
  };

  // Function that makes the axios call to promote a user 
  const handlePromoteUser = () => {
    const data = { isAdmin: true };
    axios.post(SERVER_ADDRESS + '/users/promote/' + userInfo.username, data)
      .then(res => {
        console.log(res.data);
        console.log("Axios: user successfully promoted!");
      })
      .catch(err => (console.log(err)));
  };

  // Function that makes the axios call to demote a user 
  const handleDemoteUser = () => {
    const data = { isAdmin: false };
    axios.post(SERVER_ADDRESS + '/users/demote/' + userInfo.username, data)
      .then(res => {
        console.log(res.data);
        console.log("Axios: user successfully demoted!");
      })
      .catch(err => (console.log(err)));
  };

  // Renders the users information
  const renderUserGrid = () => {
    return (
      <div>

        <div className="grid grid-cols-12 gap-2 border-b-2 border-gray-200 items-center p-5">

              <div className="col-span-1 flex justify-center">
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
              </div>

              <div className="UserInfo col-span-11" style={{ marginRight: "0.25rem", marginLeft: "2.5rem" }}>
                <div style={{color: "#53b7bb" }} className="text-2xl font-medium">
                  {"@" + userInfo.username} {userInfo.isAdmin ? " 👑 " : ""} <span className="text-sm text-gray-600 font-normal">{postNum} active posts</span>
                </div>
                <div className="text-md font-sm">
                  {/* CREATION DATE IS STORED IN USER SCHEMA */}
                  {"Member since " + userInfo.joinDate}
                </div>
              </div>

              <Button
                  variant="contained"
                  className="DeleteAccountButton"
                  onClick={() => setDeleteModalOpen(true)}
                  size="medium"
                >
                  Ban
              </Button>

                {userInfo.isAdmin
                  ?
                  <Button
                    variant="contained"
                    className="PromoteDemoteUserButton"
                    onClick={() => setDemoteModalOpen(true)}
                    size="medium"
                  >
                    Demote
                  </Button>
                  :
                  <Button
                    variant="contained"
                    className="PromotePromoteUserButton"
                    onClick={() => setPromoteModalOpen(true)}
                    size="medium"
                  >
                    Promote
                  </Button>
                }

        </div>

        <div className="UserActions pl-8 py-5">
          {renderUserActions()}
        </div>
      </div>
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
          </Grid>
          <Grid item xs={7} className="UserInfoGrid">
            {/* User Info */}
            {renderUserGrid()}
          </Grid>
          <Grid item xs={1} />
        </Grid>

        {/* DELETE ACCOUNT MODAL */}
        <BanUserModal
          username={userInfo.username}
          ban={handleDeleteAccount}
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />

        {/* EDIT PASSWORD MODAL */}
        <AdminEditPasswordModal
          username={userInfo.username}
          password={userInfo.password}
          isOpen={isPassModalOpen}
          onClose={() => setPassModalOpen(false)}
        />

        {/* PROMOTE USER */}
        <PromoteUserModal
          username={userInfo.username}
          promote={handlePromoteUser}
          isOpen={isPromoteModalOpen}
          onClose={() => setPromoteModalOpen(false)}
        />

        {/* DEMOTE USER */}
        <DemoteAdminModal
          username={userInfo.username}
          demote={handleDemoteUser}
          isOpen={isDemoteModalOpen}
          onClose={() => setDemoteModalOpen(false)}
        />

      </Grid>
    </div>
  );

}

export { UserOverviewAdmin };