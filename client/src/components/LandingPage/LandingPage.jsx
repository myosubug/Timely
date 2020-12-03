import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostCreator } from '../PostCreator/PostCreator.jsx';
import { Post } from '../Post/Post.jsx';
import { Sign } from '../SignInUp/Sign.jsx';

import { faHome, faBell, faFire, faChartLine, faSun, faClock, faCalendar, faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TagFilter from '../TagFilter/TagFilter';
import NavBar from '../NavBar/NavBar.jsx';

import axios from 'axios';
import { SERVER_ADDRESS, socket, loggedInUser, resetLoggedInUser, populateUserInfo } from '../../AppConfig.js'

import './LandingStyles.css';
import { Drawer } from '@material-ui/core';
let postQuery = "/posts/trending";
const LandingPage = (props) => {

    const [renderModalObj, setRenderModalObj] = useState({ "tags": false, "login": false, "post": false });
    const [posts, setPosts] = useState([]);
    const [numPosts, setNumPosts] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);

    useEffect(() => {
        socket.on('update post list', () => {
            renderPosts();
        });


        populateUserInfo(localStorage.getItem('token'));
        renderPosts();
        setLoggedIn(loggedInUser.username !== "");
        getNumPosts();

    }, []);


    //Gets the posts from specified query, and sets the state
    const renderPosts = () => {
        axios.get(SERVER_ADDRESS + postQuery)
            .then(res => {
                let new_posts = [];
                for (let post of res.data) {
                    new_posts.push(
                        <div className="my-8 h-full" key={post._id}>
                            <Post isAdmin={loggedInUser.isAdmin} id={post._id} thisUsername={loggedInUser.username} />
                        </div>
                    )
                }
                setPosts(new_posts);
                getNumPosts();

            })
            .catch(err => console.log(err));



    }

    //Gets the number of posts the current user has
    const getNumPosts = () => {
        if (loggedInUser.username !== "") {
            axios.get(SERVER_ADDRESS + "/users/numPosts/" + loggedInUser.username)
                .then(({ data }) => setNumPosts(data))
                .catch(err => console.log(err));
        }

    }

    // Renders the modal based on the content passed in
    function renderModal(content) {
        return (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-1/2" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        {content}
                    </div>
                </div>
            </div>
        )
    }

    // Once the user is logged in, render all the live posts
    function setLoggedIn(val) {
        setIsLoggedIn(val);
        renderPosts();
        renderRightSideBar();
    }

    //Handles what happens after we logout
    const handleLogOut = () => {
        //Sets the loggedinUser info to an empty object again
        resetLoggedInUser();

        //Set the state
        setLoggedIn(false);
    }

    //Renders the right sidebar based on if the user is logged in or not
    const renderRightSideBar = () => {
        if (isLoggedIn) {
            return (
                <div>
                    <div className="flex mb-8">
                        <Link to={"/useroverview/" + loggedInUser.username}>
                            <img className="place-self-center h-16 w-16 mr-6 ml-6 mt-2 rounded-full" src={loggedInUser.profileImage}></img>
                        </Link>
                        <div className="text-left">
                            <Link to={"/useroverview/" + loggedInUser.username}>
                                <h2 className="text-lg font-semibold text-gray-700 border-gray-400 pb-1 border-b-2"> {loggedInUser.username} </h2>
                            </Link>
                            <div className="text-gray-600" style={{ marginTop: "0.2rem", fontSize: "13px" }}>
                                <p>Posts Active: <b className="text-gray-700"> {numPosts} </b></p>
                            </div>
                        </div>
                    </div>

                    <div className="justify-center px-6">

                        {/* IF LOGGED IN */}
                        <div
                            onClick={() => setRenderModalObj(prev => ({ ...prev, "post": true }))}
                            className="button text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
                            style={{ height: "3.2rem" }}>
                            <p style={{ paddingTop: "0.18rem" }}>Create Post</p>
                        </div>

                        <div
                            onClick={handleLogOut}
                            className="button text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
                            style={{ height: "3.2rem" }}>
                            <p style={{ paddingTop: "0.18rem" }}>Log Out</p>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="justify-center px-6">
                    <div
                        onClick={() => setRenderModalObj(prev => ({ ...prev, "login": true }))}
                        className="button text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
                        style={{ height: "3.2rem" }}>
                        <p style={{ paddingTop: "0.18rem" }}>Sign In/Up</p>
                    </div>
                </div>
            );
        }
    }


    const renderLeftSideBar = () => {
        return (
            <div>
                <div className="flex justify-center text-white mt-4 font-medium text-3xl">
                    <img width="150px;" draggable="false" src="https://i.imgur.com/ATuMhih.png"></img>
                    <div className="flex justify-center px-6">
                    </div>
                </div>

                <div className="selector mt-4 ml-12 mb-8">

                    <div className="menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer">
                        <FontAwesomeIcon icon={faHome} /> <i style={{ paddingRight: "0.45rem" }} /> Home
                        </div>

                    <div className="menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer"
                        onClick={() => changePostQuery('/posts/trending')}>
                        <FontAwesomeIcon icon={faFire} /> <i className="pr-4" /> Trending
                        </div>

                    <div className="menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer"
                        onClick={() => changePostQuery('/posts/newest-posts')}>
                        <FontAwesomeIcon icon={faSun} /> <i className="fas fa-fire pr-3"></i> Newest
                        </div>

                    <div className="menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer"
                        onClick={() => changePostQuery('/posts/expiring-soon')}>
                        <FontAwesomeIcon icon={faClock} /> <i className="fas fa-fire pr-3"></i> Expiring
                        </div>

                    <div className="menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer"
                        onClick={() => changePostQuery('/posts/time-remaining')}>
                        <FontAwesomeIcon icon={faCalendar} /> <i className="fas fa-fire pr-4"></i> Longest
                        </div>
                </div>

                <div className="flex justify-center px-6">
                    <div
                        onClick={() => setRenderModalObj(prev => ({ ...prev, "tags": true }))}
                        className="button text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
                        style={{ height: "3.2rem" }}>
                        <p style={{ paddingTop: "0.18rem" }}>Tags</p>
                    </div>
                </div>
            </div>


        );
    }


    const renderRightSideBarDrawer = () => {
        return (
            <Drawer
                open={isRightMenuOpen}
                onClose={() => setIsRightMenuOpen(false)}
                anchor={"right"}
                onClick={() => setIsRightMenuOpen(false)}
            >
                {renderRightSideBar()}
            </Drawer>
        );
    }

    const renderLeftSideBarDrawer = () => {
        return (
            <Drawer
                open={isLeftMenuOpen}
                onClose={() => setIsLeftMenuOpen(false)}
                anchor={"left"}
                onClick={() => setIsLeftMenuOpen(false)}
            >
                {renderLeftSideBar()}
            </Drawer>
        );
    }

    // Function that determines what modal to render
    function checkModalState() {
        if (renderModalObj.post) {
            return renderModal(<PostCreator onCancel={() => cancelModal("post")} />);
        } else if (renderModalObj.tags) {
            return renderModal(<TagFilter onCancel={() => cancelModal("tags")} queryTags={changePostQuery} />);
        } else if (renderModalObj.login) {
            return renderModal(<Sign onCancel={() => cancelModal("login")} setLoggedIn={(val) => setLoggedIn(val)} />);
        }
    }

    // If the cancel button is clicked, reset the state and close the modal
    function cancelModal(name) {
        setRenderModalObj(prev => ({ ...prev, [name]: false }));
    }

    const changePostQuery = (query) => {
        postQuery = query;
        renderPosts();
    }


    return (
        <div>
            <NavBar
                openSignInModal={() => setRenderModalObj(prev => ({ ...prev, "login": true }))}
                isLandingPg={true}
                username={loggedInUser.username}
                rightSideBarRenderer={() => setIsRightMenuOpen(true)}
                leftSideBarRenderer={() => setIsLeftMenuOpen(true)}
            />

            {renderRightSideBarDrawer()}
            {renderLeftSideBarDrawer()}

            <div className="xl:hidden z-30 fixed right-0 bottom-0">
                <div className="flex items-end justify-end pt-4 px-4 pb-5 text-center block p-0">
                    <div class="rounded-full h-20 w-20 flex items-center justify-center bg-primary shadow-xl text-white text-3xl cursor-pointer" onClick={() => setRenderModalObj(prev => ({ ...prev, "post": true }))}>
                        <FontAwesomeIcon icon={faFeather} />
                    </div>
                </div>
            </div>

            {checkModalState()}


            <div className="grid grid-cols-9 gap-4 w-full" style={{ backgroundColor: "#fcfcfc" }}>

                <div className="hidden md:block xl:col-span-2 col-span-3 h-screen top-0 pt-24 sticky p-4 border-r-2 border-gray-400" style={{ backgroundColor: "#ededed" }}>
                    {renderLeftSideBar()}
                </div>
                <div className="col-span-9 md:col-span-6 xl:col-span-5 flex-grow justify-center w-full pt-16 xl:pt-20 px-5" style={{ backgroundColor: "#fcfcfc" }}>
                    <div className="justify-center">


                        {posts}

                    </div>
                </div>

                <div className="hidden xl:block col-span-2 h-screen top-0 sticky pt-32 p-4 border-l-2 border-gray-400" style={{ backgroundColor: "#ededed" }}>


                    {renderRightSideBar()}

                </div>

            </div>

        </div>
    );


}
export { LandingPage };