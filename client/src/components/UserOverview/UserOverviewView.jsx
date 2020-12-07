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
import { Post } from '../Post/Post';
import axios from 'axios';
import { SERVER_ADDRESS, socket, loggedInUser } from '../../AppConfig.js'

const UserOverviewView = (props) => {

  const inputFileRef = createRef(null);
  const [image, _setImage] = useState(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isPassModalOpen, setPassModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);

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
        let new_posts = [];
        for (let post of res.data) {
          new_posts.push(
            <div className="rounded-lg mb-8 border-gray-300" key={post._id}>
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

  // Function the makes the axios call to delete an account from the db
  const handleDeleteAccount = () => {
    console.log(userInfo.username);
    axios.post(SERVER_ADDRESS + '/users/delete/' + userInfo.username)
      .then(console.log("Axios: user successfully deleted!"))
      .catch(err => (console.log(err)));
  };

  // Converts join date to readable string
  const convertJoinDate = () => {
    let userJoinDate = JSON.stringify(userInfo.joinDate);
    userJoinDate = userJoinDate?.substring(6,8);
    console.log(userJoinDate);

    switch(userJoinDate) {
      case '01':
        userJoinDate = "January ";
        break;
      case '02':
        userJoinDate = "February ";
        break;
      case '03':
        userJoinDate = "March ";
        break;
      case '04':
        userJoinDate = "April ";
        break;
      case '05':
        userJoinDate = "May ";
        break;
      case '06':
        userJoinDate = "June ";
        break;
      case '07':
        userJoinDate = "July ";
        break;
      case '08':
        userJoinDate = "August ";
        break;
      case '09':
        userJoinDate = "September ";
        break;
      case '10':
        userJoinDate = "October ";
        break;
      case '11':
        userJoinDate = "November ";
        break;
      case '12':
        userJoinDate = "December ";
        break;
      default:
        userJoinDate = "Maytember? ";
    }
    return userJoinDate;
  };

  // Renders the users information
  const renderUserGrid = () => {
    return (
      <div>

        <div className="lg:flex items-baseline border-b-2 border-gray-200 items-center py-5">
          <div className="w-full lg:w-1/2">
            <div className="flex justify-center lg:justify-start">
              <div className="flex justify-start">
                <Grid item xs={9} className="ProfilePic">
                  <label htmlFor="avatar-image-upload">
                    <Avatar
                      alt="Avatar"
                      src={image}
                      className="avatar"
                    />
                  </label>
                </Grid>
              </div>

              <div className="UserInfo pl-2" style={{ marginRight: "0.25rem" }}>
                <div style={{ color: "#53b7bb" }} className="text-2xl font-medium">
                  {"@" + userInfo.username} {userInfo.isAdmin ? " 👑 " : ""} <span className="text-sm text-gray-600 font-normal">{posts.length} active posts</span>
                </div>
                <div className="text-md font-sm">
                  {/* CREATION DATE IS STORED IN USER SCHEMA */}
                  {"Member since " + convertJoinDate() + "2020"}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
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

            {posts.length > 0 &&
              <div className="text-2xl font-semibold text-gray-800 mb-5 ml-2 mt-5">
                Post Activity
              </div>
            }
            {posts}


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