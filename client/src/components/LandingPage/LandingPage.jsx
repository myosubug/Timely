import React from 'react';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    makeStyles,
    SwipeableDrawer,
    Tooltip
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { PostCreator } from '../PostCreator/PostCreator.jsx';
import { Post } from '../Post/Post.jsx';
import { Sign } from '../SignInUp/Sign.jsx';

import { faFire, faSun, faClock, faCalendar, faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TagFilter from '../TagFilter/TagFilter';
import NavBar from '../NavBar/NavBar.jsx';

import axios from 'axios';
import { SERVER_ADDRESS, socket, loggedInUser, resetLoggedInUser, populateUserInfo } from '../../AppConfig.js'

import './LandingStyles.css';
import { useCallback } from 'react';


const useStyles = makeStyles({
    paper: {
        background: '#ededed',
        width: "300px"
    }
});


let postQuery = "/posts/trending";
const LandingPage = (props) => {

    const styles = useStyles();

    const [renderModalObj, setRenderModalObj] = useState({ "tags": false, "login": false, "post": false });
    const [posts, setPosts] = useState([]);
    const [numPosts, setNumPosts] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
    const [isLeftMenuAvail, setIsLeftMenuAvail] = useState(false);
    const [isRightMenuAvail, setIsRightMenuAvail] = useState(false);


    //Gets the posts from specified query, and sets the state
    const renderPosts = useCallback(() => {
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
    }, []);

    // Once the user is logged in, render all the live posts
    const setLoggedIn = useCallback((val) => {
        setIsLoggedIn(val);
        renderPosts();
        //renderRightSideBar();
    }, [renderPosts, setIsLoggedIn]);

    useEffect(() => {
        socket.on('update post list', () => {
            renderPosts();
        });

        populateUserInfo(localStorage.getItem('token'));
        renderPosts();
        setLoggedIn(loggedInUser.username !== "");
        getNumPosts();

        return () => { socket.off('update post list') }
    }, [renderPosts, setLoggedIn]);

    //Add an event listener to the window
    useEffect(() => {

        //Gets called whenever the window is resized, checks for the window size and closes the sidebars if the length exceeds
        const resize = () => {
            if (window.innerWidth >= 1280) {
                setIsRightMenuOpen(false);
                setIsRightMenuAvail(false);
            }
            else {
                setIsRightMenuAvail(true);
            }

            if (window.innerWidth >= 768) {
                setIsLeftMenuOpen(false);
                setIsLeftMenuAvail(false);
            }
            else {
                setIsLeftMenuAvail(true);
            }

        }

        window.addEventListener("resize", resize);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
        }
    }, []);


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
            <Dialog
                open={true}
                fullWidth
                maxWidth={"md"}
            >
                <DialogContent>
                    {content}
                </DialogContent>
            </Dialog>
        )
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
                    <div className="flex mb-8 max-w-full">
                        <Link to={"/useroverview/" + loggedInUser.username}>
                            <Tooltip title="View your settings">
                                <img className="place-self-center h-16 w-16 mr-6 rounded-full" src={loggedInUser.profileImage} alt="profile"
                                    style={{ minWidth: "4rem", minHeight: "4rem" }}
                                ></img>
                            </Tooltip>
                        </Link>
                        <div className="text-left truncate max-w-0 overflow-ellipsis ml-0">
                            <Link to={"/useroverview/" + loggedInUser.username}>
                                <Tooltip title="View your settings">
                                    <h2 className="text-lg font-semibold text-gray-700 border-gray-400 pb-1 border-b-2 w-36 truncate ..." > {loggedInUser.username} </h2>
                                </Tooltip>
                            </Link>
                            <div className="text-gray-600" style={{ marginTop: "0.2rem", fontSize: "13px" }}>
                                <p>Active Posts: <b className="text-gray-700"> {numPosts} </b></p>
                            </div>
                        </div>
                    </div>

                    <div className="justify-center px-0 md:px-6">

                        {/* IF LOGGED IN */}
                        <div
                            onClick={() => {
                                setRenderModalObj(prev => ({ ...prev, "post": true }));
                                setIsRightMenuOpen(false);
                            }
                            }
                            className="button text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
                            style={{ height: "3.2rem" }}>
                            <p style={{ paddingTop: "0.18rem" }}>Create Post</p>
                        </div>

                        <div
                            onClick={handleLogOut}
                            className="button-cancel text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
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

    //Renders the left side bar
    const renderLeftSideBar = () => {
        return (
            <div>
                <div className="flex items-start justify-center text-white mt-4 font-medium text-3xl">
                    <img width="150px;" draggable="false" src={process.env.PUBLIC_URL + '/Logo.png'} alt="Timely logo"></img>
                </div>

                <div className="selector mt-4 mb-8 md:px-5">

                    <div className={"menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer" + (postQuery === "/posts/trending" ? " menu-item-select" : "")}
                        onClick={() => {
                            changePostQuery('/posts/trending');
                            setIsLeftMenuOpen(false);
                        }}>
                        <FontAwesomeIcon icon={faFire} /> <i className="pr-4" /> Trending
                        </div>

                    <div className={"menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer" + (postQuery === "/posts/newest-posts" ? " menu-item-select" : "")}
                        onClick={() => {
                            changePostQuery('/posts/newest-posts');
                            setIsLeftMenuOpen(false);
                        }}>
                        <FontAwesomeIcon icon={faSun} /> <i className="fas fa-fire pr-3"></i> Newest
                        </div>

                    <div className={"menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer" + (postQuery === "/posts/expiring-soon" ? " menu-item-select" : "")}
                        onClick={() => {
                            changePostQuery('/posts/expiring-soon');
                            setIsLeftMenuOpen(false);
                        }}>
                        <FontAwesomeIcon icon={faClock} /> <i className="fas fa-fire pr-3"></i> Expiring
                        </div>

                    <div className={"menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer" + (postQuery === "/posts/time-remaining" ? " menu-item-select" : "")}
                        onClick={() => {
                            changePostQuery('/posts/time-remaining');
                            setIsLeftMenuOpen(false)
                        }}>
                        <FontAwesomeIcon icon={faCalendar} /> <i className="fas fa-fire pr-4"></i> Longest
                        </div>
                </div>

                <div className="flex justify-center px-0 md:px-6">
                    <Tooltip title="Filter posts by tags">
                        <div
                            onClick={() => {
                                setRenderModalObj(prev => ({ ...prev, "tags": true }));
                                setIsLeftMenuOpen(false);
                            }}
                            className="button text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
                            style={{ height: "3.2rem" }}>
                            <p style={{ paddingTop: "0.18rem" }}>Tags</p>
                        </div>
                    </Tooltip>
                </div>
            </div>


        );
    }

    //Renders the left side bar, but as a drawer
    const renderRightSideBarDrawer = () => {
        return (
            <SwipeableDrawer
                open={isRightMenuOpen}
                disableSwipeToOpen={!isRightMenuAvail}
                onOpen={() => setIsRightMenuOpen(true)}
                onClose={() => setIsRightMenuOpen(false)}
                anchor={"right"}
                classes={{ paper: styles.paper }}
            >
                <div className="pt-32 p-4">
                    {renderRightSideBar()}
                </div>
            </SwipeableDrawer>
        );
    }

    //Renders teh right side bar, but as a drawer
    const renderLeftSideBarDrawer = () => {
        return (
            <SwipeableDrawer
                open={isLeftMenuOpen}
                disableSwipeToOpen={!isLeftMenuAvail}
                onOpen={() => { setIsLeftMenuOpen(true) }}
                onClose={() => setIsLeftMenuOpen(false)}
                anchor={"left"}
                classes={{ paper: styles.paper }}
            >
                <div className="pt-24 p-4">
                    {renderLeftSideBar()}
                </div>
            </SwipeableDrawer>
        );
    }

    //Conditionally renders the button for posting a new post
    const renderMobileNewPost = () => {
        if (isLoggedIn) {
            return (
                <div className="xl:hidden z-30 fixed right-0 bottom-0">
                    <div className="flex items-end justify-end pt-4 px-4 pb-5 text-center block p-0">
                        <Tooltip title="Create Post">
                            <div className="rounded-full h-20 w-20 flex items-center justify-center bg-primary shadow-xl text-white text-3xl cursor-pointer" onClick={() => setRenderModalObj(prev => ({ ...prev, "post": true }))}>
                                <FontAwesomeIcon icon={faFeather} />
                            </div>
                        </Tooltip>
                    </div>
                </div>
            );
        }
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
                rightSideBarRenderer={() => setIsRightMenuOpen(true)}
                leftSideBarRenderer={() => setIsLeftMenuOpen(true)}
            />
            {renderRightSideBarDrawer()}
            {renderLeftSideBarDrawer()}
            {renderMobileNewPost()}
            {checkModalState()}

            <div className="grid grid-cols-9 gap-4 w-full" style={{ backgroundColor: "#fcfcfc" }}>

                <div className="hidden md:block xl:col-span-2 col-span-3 h-screen top-0 pt-24 sticky p-4 border-r-2 border-gray-400" style={{ backgroundColor: "#ededed" }}>
                    {renderLeftSideBar()}
                </div>
                <div className="col-span-9 md:col-span-6 xl:col-span-5 flex-grow justify-center w-full pt-16 xl:pt-20 px-5" style={{ backgroundColor: "#fcfcfc" }}>
                    <div className="justify-center">
                        {/* Check if there are any posts, if not display a default message */}
                        {posts.length < 1
                            ? (
                                <div className="flex justify-center text-2xl font-semibold text-gray-700 rounded-full px-3 py-3 pt-10 opacity-50 select-none ...">
                                    <i className="pr-4" />
                                        No Active Posts 😔
                                </div>)
                            : posts
                        }
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