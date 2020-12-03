import React, { createRef, useEffect, useState, useParams } from 'react';
import {
  Avatar,
  Grid,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BanUserModal from './AdminPopUps/BanUserModal';
import AdminEditPasswordModal from './AdminPopUps/AdminEditPasswordModal';
import DemoteAdminModal from './AdminPopUps/DemoteAdminModal';
import PromoteUserModal from './AdminPopUps/PromoteUserModal';
import NavBar from '../NavBar/NavBar';
import { Post } from '../Post/Post';
import axios from 'axios';
import { SERVER_ADDRESS, socket, loggedInUser } from '../../AppConfig.js'
import './style.css';

const UserOverviewAdmin = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: '150px',
      height: '150px',
    },
  }));

  const inputFileRef = createRef(null);
  const [image, _setImage] = useState(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDemoteModalOpen, setDemoteModalOpen] = useState(false);
  const [isPromoteModalOpen, setPromoteModalOpen] = useState(false);
  const [isPassModalOpen, setPassModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  const [posts, setPosts] = useState([]);

  const classes = useStyles();


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

        //Setup a socket listener
        socket.on('update post list', () => {
          renderPosts(userInfo);
        });

        renderPosts(userInfo);

      })
      .catch(err => console.log(err));
  }, []);

  // Function that cleans up avatar image
  const cleanup = () => {
    // URL.revokeObjectURL(image);
    // inputFileRef.current.value = null;
  };

  //Gets the posts from specified query, and sets the state
  const renderPosts = (username_obj) => {
    axios.get(SERVER_ADDRESS + "/users/userPosts/" + username_obj.username)
      .then(res => {
        console.log(res);
        let new_posts = [];
        for (let post of res.data) {
          new_posts.push(
            <div className="border-solid border-2 rounded-lg my-8 border-gray-300 h-full" key={post._id}>
              <Post isAdmin={loggedInUser.isAdmin} id={post._id} thisUsername={loggedInUser.username} />
            </div>
          )
        }
        setPosts(new_posts);

      })
      .catch(err => console.log(err));
  }

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
      <Grid container spacing={10}>
      <Grid item xs={12}>
          <NavBar
            isLandingPg={false}
            username={props.username}
          />
        </Grid>
        <Grid item xs={1} />
        {/* Profile pic grid */}
        <Grid item xs={2} className="ProfileGrid">
          {renderProfileGrid()}
        </Grid>
        {/* User Info */}
        <Grid item xs={8} className="UserInfoGrid">
          {renderUserGrid()}
        </Grid>
        <Grid item xs={1} />

        <Grid item xs={3} />
        <Grid item xs={8}>
        {posts.length > 0 && 
          <Typography variant="h5" component="span">
            Post Activity
          </Typography>
        }
          {posts}
        </Grid>
        <Grid item xs={1} />

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