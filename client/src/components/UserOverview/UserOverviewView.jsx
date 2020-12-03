import React, { createRef, useEffect, useState } from 'react';
import {
  Avatar,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar/NavBar';
import { Post } from '../Post/Post';
import axios from 'axios';
import { loggedInUser, SERVER_ADDRESS, socket } from '../../AppConfig.js'
import './style.css';

const UserOverviewView = (props) => {
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


  //Gets the posts from specified query, and sets the state
  const renderPosts = (username_obj) => {
    axios.get(SERVER_ADDRESS + "/users/userPosts/" + username_obj.username)
      .then(res => {
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
                className={classes.large}
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
            {posts.length + " post(s)"}
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

        {/* Edit Username */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="h6">Username</Typography>
            {userInfo.username}
          </Grid>

        </Grid>

        {/* Edit Password */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="h6">Password</Typography>
            ********
          </Grid>

        </Grid>
      </div>
    );
  }

  return (
    <div className="UserOverviewView">
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
      </Grid>
    </div>
  );

}

export { UserOverviewView };