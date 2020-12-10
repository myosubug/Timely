import React, { useEffect, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';
import EditPasswordModal from '../EditPasswordModal/EditPasswordModal';
import NavBar from '../NavBar/NavBar';
import { Post } from '../Post/Post';
import axios from 'axios';
import { SERVER_ADDRESS, socket, loggedInUser } from '../../AppConfig.js'

const UserOverviewEdit = (props) => {
  const [image, _setImage] = useState(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
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
  }, [props.username]);

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
    _setImage(newImage);
  };

  // Takes uploaded img and passes it to setImg function to be set
  const handleOnImgChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      //Only update if we are uploading an image
      if (newImage.type.split("/")[0] === "image") {
        const imgData = new FormData();
        imgData.append('myFile', newImage);
        axios.post(SERVER_ADDRESS + "/users/upload-profile/" + userInfo.username, imgData)
          .then(({ data }) => {
            // setImage(data);
          })
          .catch(err => console.log(err));
        setImage(URL.createObjectURL(newImage));
      }

    }
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
    let date = JSON.stringify(userInfo.joinDate);
    date = date?.substring(1, 11);
    return date;
  };

  // Renders the users information
  const renderUserGrid = () => {
    return (
      <div>
        <div>
          <div className="lg:flex items-baseline border-b-2 border-gray-200 items-center py-5 lg:pl-8 overflow-x-auto">
            <div className="w-full lg:w-1/2">

              <div className="flex justify-start">
                <div className="flex justify-start">
                  <Tooltip title="Change profile picture">
                    <button className="flex h-20 w-20 focus:outline-none">
                      <input
                        accept="image/*"
                        hidden
                        id="avatar-image-upload"
                        type="file"
                        onChange={handleOnImgChange}
                      />
                      <label htmlFor="avatar-image-upload" className="cursor-pointer">
                        <img
                          alt="Avatar"
                          src={image}
                          className="place-self-center h-20 w-20 mr-6 mt-2 rounded-full"
                        />
                      </label>
                    </button>
                  </Tooltip>
                </div>

                <div className="UserInfo pl-6 max-w-0" style={{ marginRight: "0.25rem" }}>
                  <div style={{ color: "#53b7bb" }} className="text-2xl font-medium">
                    <p>{userInfo.isAdmin ? "👑" : ""}&#8205;{userInfo.username}</p>
                    <p className="text-sm text-gray-600 font-normal">{posts.length} active posts</p>
                  </div>
                  <div className="text-md font-sm">
                    {"Member since " + convertJoinDate()}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Account actions */}
          <div className="UserActions lg:pl-8 lg:py-5">
            {renderUserActions()}
          </div>
        </div>
      </div>
    )
  }

  // Renders the action buttons: edit username, edit password
  const renderUserActions = () => {
    return (
      <div>
        {/* Username */}
        <div className="lg:flex items-baseline">
          <div className="w-full lg:w-1/2"><h3 className="font-semibold text-center lg:text-left m-0 p-0 text-2xl text-gray-700">
            Username
              </h3><h5 className="font-normal text-center lg:text-left m-0 p-0 text-sm lg:text-base truncate">
              {userInfo.username}
            </h5>
          </div>

          <div className="w-full lg:w-1/2 mt-4 lg:mt-2 h-12 px-16 flex justify-center lg:justify-end">
            <Tooltip title="Delete account">
              <div
                onClick={() => setDeleteModalOpen(true)}
                className="flex w-32 justify-center items-center button-cancel text-white text-md font-semibold mb-2 rounded cursor-pointer shadow-md">
                <span>Delete</span>
              </div>
            </Tooltip>
          </div>

        </div>

        {/* Password */}
        <div className="lg:flex items-baseline">
          <div className="w-full lg:w-1/2">
            <h3 className="font-semibold text-center lg:text-left m-0 p-0 text-2xl text-gray-700">
              Password
              </h3>
            <h5 className="font-normal text-center lg:text-left m-0 p-0 text-sm lg:text-base">
              ********
              </h5>
          </div>

          <div className="w-full lg:w-1/2 mt-4 lg:mt-2 h-12 px-16 flex justify-center lg:justify-end">
            <Tooltip title="Change password">
              <div
                onClick={() => setPassModalOpen(true)}
                className="flex w-32 justify-center items-center button text-white text-md font-semibold mb-2 rounded cursor-pointer shadow-md"
              >
                <span>Change</span>
              </div>
            </Tooltip>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="UserOverviewEdit">
      <NavBar />


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

export { UserOverviewEdit };