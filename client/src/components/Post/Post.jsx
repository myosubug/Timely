import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from '@material-ui/core';

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
        
*/
const Post = (props) => {

    const [isOverflow, setIsOverFlow] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState();
    const [postDetails, setPostDetails] = useState({});
    const [isLikeSelected, setIsLikeSelected] = useState(false);
    const [isDislikeSelected, setIsDislikeSelected] = useState(false);


    //Gets all the necessary variables needed for the post
    useEffect(() => {
        const type = "text";
        const maxTime = 5 * 60; //in seconds
        //const time = 4 * 60; //in seconds
        const username = "notPavol";
        //Time calculation (get current time in UTC and subtract from the given time)
        const dueDate = new Date().getTime() + 5 * 60000; //will be a date object instead
        const timePosted = new Date(); //Will be a date object instead
        const time = (dueDate - timePosted.getTime()) / 1000; //Time difference in seconds

        const likeCount = 21000;
        const dislikeCount = 50;

        const text_content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat, tellus eu tempus facilisis, odio mi luctus ante, et malesuada ligula eros nec nisi. Aenean a porta neque. Sed posuere sollicitudin magna quis varius. Aenean ultrices justo id arcu commodo, sit amet ullamcorper nibh placerat. Nunc id tincidunt magna. Sed vel egestas nisi. Quisque condimentum interdum hendrerit. Sed nec convallis augue. Duis pellentesque semper ullamcorper. Nullam nec nisl justo. Nam sed ante id enim rutrum scelerisque. Quisque tincidunt dolor odio. Cras maximus, lacus at lobortis porta, metus ipsum maximus odio, quis suscipit elit dui id mi. Morbi congue elementum purus, nec dignissim massa fringilla id. Duis mauris elit, gravida at mattis nec, convallis eu eros. Praesent pharetra tortor nec lectus scelerisque feugiat. Ut ac ligula quis nunc pharetra feugiat. Nulla at dui scelerisque, dapibus purus in, ultrices mi. Vestibulum quis ligula posuere, efficitur augue in, dignissim dolor. Phasellus maximus, nulla eu sollicitudin aliquet, purus arcu varius libero, quis egestas tortor risus et ipsum. Integer dolor nisi, hendrerit ut dolor ut, tincidunt volutpat quam. Phasellus a ultrices sem, in vehicula nulla. Sed consectetur tellus quis turpis mollis eleifend. Nunc tincidunt porttitor consectetur. Nunc a nunc vel lacus dignissim egestas ut at tortor. Praesent nec magna eget nisl molestie rutrum quis id metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur lorem erat, a ultricies purus sodales eu. Praesent scelerisque sollicitudin justo non suscipit. Morbi sit amet posuere tortor, at bibendum dolor.  Fusce sodales varius sagittis. Sed mi magna, interdum sit amet convallis id, mattis vel urna. In sagittis maximus porta. Maecenas non mi id tellus blandit porttitor vitae et justo. Curabitur interdum imperdiet dolor sed eleifend. Donec eu aliquam urna, id pretium risus. Vestibulum tristique efficitur purus, at venenatis mauris volutpat non. Nulla scelerisque ex in purus convallis volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean sit amet lacus tincidunt, congue dui quis, facilisis ex. Aenean convallis pulvinar erat, eget molestie diam lacinia nec. Ut vitae metus purus. Duis tristique nec felis sed sodales. Maecenas aliquet mi dictum urna venenatis, ac pharetra dui gravida. Sed vel enim urna. Donec ante neque, viverra eget nulla a, feugiat condimentum lectus. Ut euismod dolor quis ligula ultrices euismod. Mauris suscipit euismod auctor. Fusce semper mi vel elit posuere, eget accumsan massa placerat. Sed cursus odio sit amet dui placerat, eget luctus eros commodo. Vivamus eleifend, arcu pulvinar ornare egestas, ex tellus hendrerit erat, ut interdum magna odio id massa. Nulla lacinia, lorem sit amet egestas faucibus, nibh eros iaculis lorem, a pulvinar elit felis eu enim. Proin vel consequat nisl, ac lacinia est.";
        const img_src = "https://i.kym-cdn.com/photos/images/newsfeed/001/295/524/cda.jpg";

        //Set the time reamining to what the time
        setTimeRemaining(time);

        setPostDetails({
            type: type,
            maxTime: maxTime,
            time: time,
            username: username,
            timePosted: timePosted.toDateString(),
            likeCount: likeCount,
            dislikeCount: dislikeCount,
            textContent: text_content,
            imgSrc: img_src,
        });
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
                else {
                    ret = prev;
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
        const min = Math.floor(timeRemaining / 60);
        const sec = timeRemaining % 60;

        return min.toString() + "m " + sec.toString() + "s";
    }

    //Handles like click
    const handleLikeClick = () => {
        //TODO: Add/remove like

        //Check if the dislike was selected, and if so, disable it
        if (isDislikeSelected) {
            setIsDislikeSelected(false);
        }
        setIsLikeSelected(prev => !prev);
    }

    //Handles dislike click
    const handleDislikeClick = () => {
        //TODO: Add/remove dislike

        if (isLikeSelected) {
            setIsLikeSelected(false);
        }
        setIsDislikeSelected(prev => !prev);
    }


    return (
        <div id={styles.container}>
            <Grid container>
                <Grid item xs={10}>
                    <div className={styles.profile_info} onClick={handleUserClick}>
                        <Avatar>P</Avatar>
                    </div>

                    <h1 className={styles.profile_info} onClick={handleUserClick}> {postDetails.username} </h1>
                    <p className={styles.profile_info}> {postDetails.timePosted} </p>
                </Grid>
                <Grid item xs={2}>
                    <div className={`${styles.action_btn} ${styles.no_text_select} ${isLikeSelected ? styles.action_btn_selected : ''}`} onClick={handleLikeClick}>
                        <p>👍</p>
                        <p> {renderLikeInfo(postDetails.likeCount)} </p>
                    </div>

                    <div className={`${styles.action_btn} ${styles.no_text_select} ${isDislikeSelected ? styles.action_btn_selected : ''}`} onClick={handleDislikeClick}>
                        <p>👎</p>
                        <p> {renderLikeInfo(postDetails.dislikeCount)} </p>
                    </div>
                </Grid>


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
            </Grid>

            <BorderLinearProgress variant="determinate" value={(timeRemaining / postDetails.maxTime) * 100} />

        </div>
    );


}

Post.propTypes = {
    id: PropTypes.number,
    isAdmin: PropTypes.bool,
};

export { Post };