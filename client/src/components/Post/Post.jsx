import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Avatar,
    Grid,
    Tooltip,
    LinearProgress,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Button
} from '@material-ui/core';
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostSubMenu } from './PostSubMenu.jsx';
import axios from 'axios';
import { SERVER_ADDRESS, socket } from '../../AppConfig.js'
import styles from './PostStyles.module.css';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 0,
    },
    colorPrimary: {
        backgroundColor: "#e1e1e1",
    },
    bar: {
        borderRadius: 0,
        backgroundColor: '#afc5d3',
    },
}))(LinearProgress);


const TagChip = withStyles({
    root: {
        backgroundColor: '#637987',
        opacity: '75%',
        margin: "5px",
        maxWidth: "100%"
    }
})(Chip);


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
        let mounted = true;
        const populateDate = () => {
            axios.get(SERVER_ADDRESS + "/posts/" + props.id)
                .then(res => {
                    if (mounted) {
                        const obj = res.data;

                        const id = obj._id;
                        const username = obj.username;
                        const type = obj.type;
                        const expiryDate = obj.expiryDate;
                        const timePosted = new Date(obj.dateCreated);
                        const tags = obj.tags;

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
                        const img_src = obj.imageURL;


                        //Adapated from https://stackoverflow.com/questions/25275696/javascript-format-date-time/25276435 
                        const formatDate = (date) => {

                            let hours = date.getHours();
                            let minutes = date.getMinutes();
                            let ampm = hours >= 12 ? 'PM' : 'AM';
                            hours = hours % 12;
                            hours = hours ? hours : 12; // the hour '0' should be '12'
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            let strTime = hours + ':' + minutes + ' ' + ampm;

                            return date.toDateString() + " at " + strTime;


                        }

                        const date_display = formatDate(timePosted);

                        //Get the user's profile picture
                        axios.get(SERVER_ADDRESS + "/users/findUser/" + username)
                            .then(({ data }) => {
                                const profileImage = data.profileImage + "?" + Date.now();

                                //Set the date
                                setPostDetails({
                                    id: id,
                                    type: type,
                                    maxTime: maxTime,
                                    time: time,
                                    username: username,
                                    timePosted: date_display,
                                    likeCount: likeCount,
                                    dislikeCount: dislikeCount,
                                    textContent: text_content,
                                    imgSrc: img_src,
                                    profileImage: profileImage,
                                    tags: tags

                                });
                            }
                            )
                            .catch(err => console.log(err));




                        //Check if we have already liked the post
                        if (props.thisUsername in obj.likedUsers) {
                            setIsLikeSelected(true);
                        }
                        else if (props.thisUsername in obj.dislikedUsers) {
                            setIsDislikeSelected(true);
                        }


                    }
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


        return () => {
            socket.off(update_event_name);
            mounted = false;
        }
    }, [props.id, props.thisUsername, props.username]);

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
        window.location.href = '/useroverview/' + postDetails.username; //relative to domain
        console.log(postDetails.username);
        // alert("redirecting to user page");
    }

    //Renders the header of the post (with or without the admin settings)
    const renderHeader = () => {

        const renderActions = () => {
            //If the user is logged in
            if (props.thisUsername !== "") {
                return (<div className="ml-auto mr-3">
                    <div className={`${styles.action_btn} ${styles.no_text_select} ${isLikeSelected ? styles.action_btn_selected : ''}`} onClick={handleLikeClick}>
                        <p className="pr-2"> <span role="img" aria-label="upvote">👍</span> </p>
                        <p> {renderLikeInfo(postDetails.likeCount)} </p>
                    </div>

                    <div className={`${styles.action_btn} ${styles.no_text_select} ${isDislikeSelected ? styles.action_btn_selected : ''}`} onClick={handleDislikeClick}>
                        <p className="pr-2"> <span role="img" aria-label="downvote"> 👎 </span></p>
                        <p> {renderLikeInfo(postDetails.dislikeCount)} </p>
                    </div>
                </div>
                );

            }
        }

        const header = <CardHeader
            style={{ width: "100%" }}
            avatar={<Tooltip title="View profile"><Avatar className={styles.profile_info} onClick={handleUserClick} src={postDetails.profileImage}></Avatar></Tooltip>}
            title={
                <Tooltip title="View profile">
                    <div className={"truncate cursor-pointer"} onClick={handleUserClick} style={{ width: "fit-content" }} id={styles["username-display"]}> {postDetails.username} </div>
                </Tooltip>
            }

            subheader={postDetails.timePosted}
            action={renderActions()}
        />;

        if (!props.isAdmin) {
            return (
                <div className="flex mt-2 pl-8">
                    {header}
                </div>
            );
        }

        else {
            return (
                <div className="flex mt-2">
                    <PostSubMenu id={props.id} />
                    {header}
                </div>
            );
        }
    }

    //Renders the content depending on the type of post
    const renderContent = () => {
        if (postDetails.type === "img") {
            return <img src={postDetails.imgSrc} alt="Post" />
        }
        else {
            return <p>{postDetails.textContent}</p>
        }
    }

    //Truncates the like/dislike number if it exceeds 1000
    const renderLikeInfo = (num) => {
        if (num >= 1000) {
            num = Math.floor(num / 1000);

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
            sec = 0;
        }

        return min.toString() + "m " + sec.toString() + "s";
    }

    //Renders the tags
    const renderTags = () => {
        if (postDetails.tags !== undefined && postDetails.tags.length > 0) {
            return <div id={styles.tag_container}>
                {postDetails.tags.map(tag => <TagChip label={tag} color="primary" key={tag} />)}
            </div>
        }

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
        <div id={styles.container}
            style={{
                borderRadius: 12,
                boxShadow: "0px 0px"
            }}>
            <Card
                style={{
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#d6d6d6",
                    borderRadius: 12,
                    backgroundColor: "#fcfcfc",
                    boxShadow: "0px 0px"
                }}>
                {renderHeader()}
                <CardContent style={{ padding: 0 }}>
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
                            <p style={{ color: "#aaaaaa" }} id={styles.timer} className={styles.no_text_select}> <span style={{ color: "#9c9c9c" }} ><FontAwesomeIcon icon={faClock} /></span> {renderTimeInfo()} </p>
                        </Grid>

                        <Grid item xs={12}>
                            {renderTags()}
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