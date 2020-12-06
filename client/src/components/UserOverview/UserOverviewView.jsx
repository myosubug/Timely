import React, { createRef, useEffect, useState } from 'react';
import {
  Avatar,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';
import EditPasswordModal from '../EditPasswordModal/EditPasswordModal';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../AppConfig.js'
import './style.css';

const UserOverviewView = (props) => {

  const inputFileRef = createRef(null);
  const [image, _setImage] = useState(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isPassModalOpen, setPassModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [postNum, setPostNum] = useState(0);

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

  // Function the makes the axios call to delete an account from the db
  const handleDeleteAccount = () => {
    console.log(userInfo.username);
    axios.post(SERVER_ADDRESS + '/users/delete/' + userInfo.username)
      .then(console.log("Axios: user successfully deleted!"))
      .catch(err => (console.log(err)));
  };

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
            <label htmlFor="avatar-image-upload">
              <Avatar
                alt="Avatar"
                src={image}
                className="avatar"
              />
            </label>
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  // Renders the users information
  const renderUserGrid = () => {
    return (
      <div>

        <div className="lg:flex items-baseline border-b-2 border-gray-200 items-center py-5">
          <div className="w-full lg:w-1/2">
              <div className="flex justify-center lg:justify-start">
                <div className="flex justify-start">
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

                <div className="UserInfo pl-2" style={{ marginRight: "0.25rem" }}>
                  <div style={{color: "#53b7bb" }} className="text-2xl font-medium">
                    {"@" + userInfo.username} {userInfo.isAdmin ? " 👑 " : ""} <span className="text-sm text-gray-600 font-normal">{userInfo.posts} active posts</span>
                  </div>
                  <div className="text-md font-sm">
                    {/* CREATION DATE IS STORED IN USER SCHEMA */}
                    {"Member since " + userInfo.joinDate}
                  </div>
                </div>
              </div>
            </div>
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

        <div className="lg:flex items-baseline pb-2 lg:pb-0">
          <div className="w-full"><h3 class="font-semibold text-center lg:text-left m-0 p-0 text-2xl text-gray-700">
                Username
              </h3><h5 className="font-normal text-center lg:text-left m-0 p-0 text-sm lg:text-base">
              {userInfo.username}
              </h5>
          </div>
        </div>

        <div className="lg:flex items-baseline">
          <div className="w-full"><h3 class="font-semibold text-center lg:text-left m-0 p-0 text-2xl text-gray-700">
                Password
              </h3><h5 className="font-normal text-center lg:text-left m-0 p-0 text-sm lg:text-base">
              ********
              </h5>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="UserOverviewEdit">
          <NavBar
            isLandingPg={false}
            username={props.username}
          />


          <div className="grid grid-cols-9 gap-4 w-full">

          <div className="hidden xl:block xl:col-span-2 col-span-3 h-screen top-0 pt-24 sticky p-4 border-r-2 border-gray-400" style={{ backgroundColor: "#ededed" }}>
          </div>

          <div className="col-span-9 xl:col-span-5 flex-grow justify-center w-full pt-16 xl:pt-20 px-5" style={{ backgroundColor: "#fcfcfc" }}>
                    <div className="justify-center">
                    {renderUserGrid()}
                    </div>
                </div>
          
          <div className="hidden xl:block col-span-2 h-screen top-0 sticky pt-32 p-4 border-l-2 border-gray-400" style={{ backgroundColor: "#ededed" }}>
          </div>

          </div>

        {/* DELETE ACCOUNT MODAL */}
        <DeleteAccountModal
          username={userInfo.username}
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
    </div>
  );

}

export { UserOverviewView };