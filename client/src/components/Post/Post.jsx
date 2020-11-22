import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { Button } from '@material-ui/core';

import { PostSubMenu } from './PostSubMenu.jsx';

import axios from 'axios';
import { SERVER_ADDRESS, socket } from '../../AppConfig.js'

import styles from './PostStyles.module.css';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[200],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

/* 
    Props:
        id -> id of the post
        isAdmin -> true/false for if the user is in admin mode
        thisUsername -> the name of the current user (used to determine like/dislike display), set it to undefined if user is not logged in
        
*/
const Post = (props) => {

    const [isOverflow, setIsOverFlow] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState();
    const [postDetails, setPostDetails] = useState({});
    const [isLikeSelected, setIsLikeSelected] = useState(false);
    const [isDislikeSelected, setIsDislikeSelected] = useState(false);


    //Gets all the necessary variables needed for the post
    useEffect(() => {

        const populateDate = () => {
            axios.get(SERVER_ADDRESS + "/posts/" + props.id)
                .then(res => {
                    const obj = res.data;

                    const id = obj._id;
                    const username = obj.username;
                    const type = obj.type;
                    const expiryDate = obj.expiryDate;
                    const timePosted = new Date(obj.dateCreated);

                    const maxTime = obj.maxTime;
                    let time = (new Date(expiryDate) - new Date()) / 1000; //Time difference in seconds

                    //Check if the difference is less than 0, and if so, set it to 0 (compensating for post removal lag)
                    if (time < 0) {
                        time = 0;
                    }
                    setTimeRemaining(time);

                    const likeCount = obj.likeCount;
                    const dislikeCount = obj.dislikeCount;
                    const text_content = obj.textContent;

                    //Set the date
                    setPostDetails({
                        id: id,
                        type: type,
                        maxTime: maxTime,
                        time: time,
                        username: username,
                        timePosted: timePosted.toDateString(),
                        likeCount: likeCount,
                        dislikeCount: dislikeCount,
                        textContent: text_content
                    });

                    //Check if we have already liked the post
                    if (props.thisUsername in obj.likedUsers) {
                        setIsLikeSelected(true);
                    }
                    else if (props.thisUsername in obj.dislikedUsers) {
                        setIsDislikeSelected(true);
                    }

                    //TODO: Work on image content



                })
                .catch(err => console.log(err));
        }

        //Setup event for re-rendering this specific post (using the id of the post)
        const update_event_name = "update post " + props.id;
        socket.on(update_event_name, () => {
            populateDate();
        });

        //On the first render, get the data
        populateDate();
    }, []);

    //Sets the interval for the timer
    useEffect(() => {
        const bar_interval = setInterval(() => {
            //Decrease the bar every second
            setTimeRemaining(prev => {
                let ret;
                if (prev > 0) {
                    ret = prev - 1;
                }
                //If the times is less than 0, then set it to 0, and stop counting down
                else {
                    ret = 0;
                    clearInterval(bar_interval);
                }
                return ret;
            });
        }, 1000);

        //Clean up
        return () => {
            clearInterval(bar_interval);
        };
    }, []);


    //Toggles the button layout and if more content is shown
    const handleShowMoreClick = () => {
        setIsOverFlow(prev => !prev);
    }

    //Redirects to the user page
    const handleUserClick = () => {
        //TODO: Redirect to user page
        alert("redirecting to user page");
    }

    //Renders the header of the post (with or without the admin settings)
    const renderHeader = () => {

        const renderActions = () => {
            //If the user is logged in
            if (props.thisUsername !== undefined) {
                return (<div>
                    <div className={`${styles.action_btn} ${styles.no_text_select} ${isLikeSelected ? styles.action_btn_selected : ''}`} onClick={handleLikeClick}>
                        <p>👍</p>
                        <p> {renderLikeInfo(postDetails.likeCount)} </p>
                    </div>

                    <div className={`${styles.action_btn} ${styles.no_text_select} ${isDislikeSelected ? styles.action_btn_selected : ''}`} onClick={handleDislikeClick}>
                        <p>👎</p>
                        <p> {renderLikeInfo(postDetails.dislikeCount)} </p>
                    </div>
                </div>
                );

            }
        }

        const header = <CardHeader
            avatar={<Avatar className={styles.profile_info} onClick={handleUserClick}>P</Avatar>}
            title={<p className={styles.profile_info} onClick={handleUserClick}> {postDetails.username} </p>}
            subheader={postDetails.timePosted}
            action={renderActions()}
        />;

        if (!props.isAdmin) {
            return (
                <Grid container>
                    <Grid item xs={1}>

                    </Grid>
                    <Grid item xs={10}>
                        {header}
                    </Grid>
                </Grid>
            );
        }

        else {
            return (
                <Grid container>
                    <Grid item xs={1}>
                        <PostSubMenu />
                    </Grid>
                    <Grid item xs={10}>
                        {header}
                    </Grid>
                </Grid>
            );
        }
    }

    //Renders the content depending on the type of post
    const renderContent = () => {
        if (postDetails.type === "img") {
            return <img src={postDetails.imgSrc} />
        }
        else {
            return <p> {postDetails.textContent} </p>
        }
    }

    //Truncates the like/dislike number if it exceeds 1000
    const renderLikeInfo = (num) => {
        if (num > 1000) {
            num /= 1000;

            return num.toString() + "K";
        }

        else {
            return num;
        }
    }

    //Renders the amount of time remaining on the post
    const renderTimeInfo = () => {
        let min;
        let sec;
        if (timeRemaining > 0) {
            min = Math.floor(timeRemaining / 60);
            sec = Math.floor(timeRemaining % 60);
        }
        else {
            min = 0;
            sec = 0
        }

        return min.toString() + "m " + sec.toString() + "s";
    }

    //Handles like click
    const handleLikeClick = () => {
        //Check if the dislike was selected, and if so, disable it
        if (isDislikeSelected) {
            setIsDislikeSelected(false);
        }
        setIsLikeSelected(prev => !prev);

        axios.post(SERVER_ADDRESS + "/posts/action-post/like/" + postDetails.id + "/" + props.thisUsername)
            .catch(err => console.log(err));
    }

    //Handles dislike click
    const handleDislikeClick = () => {
        //TODO: Add/remove dislike

        if (isLikeSelected) {
            setIsLikeSelected(false);
        }
        setIsDislikeSelected(prev => !prev);

        axios.post(SERVER_ADDRESS + "/posts/action-post/dislike/" + postDetails.id + "/" + props.thisUsername)
            .catch(err => console.log(err));
    }


    return (
        <div id={styles.container}>
            <Card>
                {renderHeader()}
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <div id={styles.content} className={isOverflow ? "" : styles.no_overflow}>
                                {renderContent()}
                            </div>
                        </Grid>

                        <Grid item xs={6} className={styles.bottom_options}>
                            <Button id={styles.show_more_btn} onClick={handleShowMoreClick}> {isOverflow ? "Show Less" : "Show More"} </Button>
                        </Grid>
                        <Grid item xs={6} className={styles.bottom_options}>
                            <p id={styles.timer} className={styles.no_text_select}> {renderTimeInfo()} </p>
                        </Grid>

                        <Grid item xs={12}>
                            <BorderLinearProgress variant="determinate" value={(timeRemaining / postDetails.maxTime) * 100 > 100 ? 100 : (timeRemaining / postDetails.maxTime) * 100} />
                        </Grid>

                    </Grid>

                </CardContent>
            </Card>
        </div>
    );


}

Post.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    thisUsername: PropTypes.string.isRequired
};

export { Post };