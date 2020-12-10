import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { Post } from '../Post/Post';
import axios from 'axios';
import { SERVER_ADDRESS, socket, loggedInUser } from '../../AppConfig.js'

const UserOverviewView = (props) => {

  const [image, _setImage] = useState(null);
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

        <div className="lg:flex items-baseline border-b-2 border-gray-200 items-center py-5 lg:pl-8 overflow-x-auto">
          <div className="w-full lg:w-1/2">

            <div className="flex justify-start">
              <div className="flex justify-start">
                <div className="flex h-20 w-20 focus:outline-none">
                  <label htmlFor="avatar-image-upload">
                    <img
                      alt="Avatar"
                      src={image}
                      className="place-self-center h-20 w-20 mr-6 mt-2 rounded-full"
                    />
                  </label>
                </div>
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

      </div>
    )
  }

  return (
    <div className="UserOverviewEdit">
      <NavBar />

      <div className="grid grid-cols-9 gap-4 w-full">
        <div className="hidden xl:block xl:col-span-2 col-span-3 h-screen top-0 pt-24 sticky p-4 border-r-2 border-gray-400" style={{ backgroundColor: "#ededed" }}>
        </div>

        <div className="col-span-9 xl:col-span-5 flex-grow justify-center w-full pt-16 xl:pt-20 px-5" style={{ backgroundColor: "#fcfcfc" }}>
          <div className="justify-center">
            {/* User grid */}
            {renderUserGrid()}

            {/* Post activity */}
            {posts.length > 0 &&
              <div className="text-2xl font-semibold text-gray-800 mb-5 ml-2 mt-5">
                Post Activity
              </div>}
            {posts}
          </div>
        </div>

        <div className="hidden xl:block col-span-2 h-screen top-0 sticky pt-32 p-4 border-l-2 border-gray-400" style={{ backgroundColor: "#ededed" }}>
        </div>

      </div>
    </div>
  );

}

export { UserOverviewView };