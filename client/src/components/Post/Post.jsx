import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from '@material-ui/core';

import './PostStyles.css'

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
        type -> "img" or "text"
        MaxTime -> int for the maximum (or 100% of the bar) in seconds
        time -> time in seconds given to the post
*/
const Post = (props) => {

    const [isOverflow, setIsOverFlow] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(props.time);

    useEffect(() => {
        const bar_interval = setInterval(() => {
            //Decrease the bar every second
            setTimeRemaining(prev => {
                let ret;
                if(prev > 0){
                     ret = prev -1;
                }
                else{
                    ret = prev;
                }
                return ret;
            });
        },1000);

        return () => {
            clearInterval(bar_interval);
          };
    },[]);
    
    const handleShowMoreClick = () => {
        setIsOverFlow(prev => !prev);
    }


    const renderContent = () => {
        if(props.type === "img"){
            return <img src={"https://i.kym-cdn.com/photos/images/newsfeed/001/295/524/cda.jpg"} />
        }
        else{
            return <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat, tellus eu tempus facilisis, odio mi luctus ante, et malesuada ligula eros nec nisi. Aenean a porta neque. Sed posuere sollicitudin magna quis varius. Aenean ultrices justo id arcu commodo, sit amet ullamcorper nibh placerat. Nunc id tincidunt magna. Sed vel egestas nisi. Quisque condimentum interdum hendrerit.

            Sed nec convallis augue. Duis pellentesque semper ullamcorper. Nullam nec nisl justo. Nam sed ante id enim rutrum scelerisque. Quisque tincidunt dolor odio. Cras maximus, lacus at lobortis porta, metus ipsum maximus odio, quis suscipit elit dui id mi. Morbi congue elementum purus, nec dignissim massa fringilla id. Duis mauris elit, gravida at mattis nec, convallis eu eros. Praesent pharetra tortor nec lectus scelerisque feugiat.
            
            Ut ac ligula quis nunc pharetra feugiat. Nulla at dui scelerisque, dapibus purus in, ultrices mi. Vestibulum quis ligula posuere, efficitur augue in, dignissim dolor. Phasellus maximus, nulla eu sollicitudin aliquet, purus arcu varius libero, quis egestas tortor risus et ipsum. Integer dolor nisi, hendrerit ut dolor ut, tincidunt volutpat quam. Phasellus a ultrices sem, in vehicula nulla. Sed consectetur tellus quis turpis mollis eleifend. Nunc tincidunt porttitor consectetur. Nunc a nunc vel lacus dignissim egestas ut at tortor. Praesent nec magna eget nisl molestie rutrum quis id metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur lorem erat, a ultricies purus sodales eu. Praesent scelerisque sollicitudin justo non suscipit. Morbi sit amet posuere tortor, at bibendum dolor. 
            Fusce sodales varius sagittis. Sed mi magna, interdum sit amet convallis id, mattis vel urna. In sagittis maximus porta. Maecenas non mi id tellus blandit porttitor vitae et justo. Curabitur interdum imperdiet dolor sed eleifend. Donec eu aliquam urna, id pretium risus. Vestibulum tristique efficitur purus, at venenatis mauris volutpat non. Nulla scelerisque ex in purus convallis volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Aenean sit amet lacus tincidunt, congue dui quis, facilisis ex. Aenean convallis pulvinar erat, eget molestie diam lacinia nec. Ut vitae metus purus. Duis tristique nec felis sed sodales. Maecenas aliquet mi dictum urna venenatis, ac pharetra dui gravida. Sed vel enim urna. Donec ante neque, viverra eget nulla a, feugiat condimentum lectus. Ut euismod dolor quis ligula ultrices euismod. Mauris suscipit euismod auctor. Fusce semper mi vel elit posuere, eget accumsan massa placerat. Sed cursus odio sit amet dui placerat, eget luctus eros commodo. Vivamus eleifend, arcu pulvinar ornare egestas, ex tellus hendrerit erat, ut interdum magna odio id massa. Nulla lacinia, lorem sit amet egestas faucibus, nibh eros iaculis lorem, a pulvinar elit felis eu enim. Proin vel consequat nisl, ac lacinia est.

            </p>
        }
    }

    return (
        <div id="container">
            <Grid container>
                <Grid item xs={10}>
                    <div className="profile_info">
                        <Avatar>P</Avatar>
                    </div>

                    <h1 className="profile_info">@Name</h1>
                    <p className="profile_info">Time</p>
                </Grid>
                <Grid item xs={2}>
                    <div className="action_btn">
                        <div className="action_btn_text">
                            <p>👍</p>
                            <p> 20k </p>
                        </div>
                    </div>

                    <div className="action_btn">
                        <div className="action_btn_text">
                            <p>👎</p>
                            <p>10k</p>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <div id="content" className={isOverflow ? "" : "no_overflow"}>
                {renderContent()}
            </div>

            <Button onClick={handleShowMoreClick}> {isOverflow ? "Show Less" : "Show More"} </Button>

            <BorderLinearProgress variant="determinate" value={(timeRemaining/ props.MaxTime)*100} />

        </div>
    );


}

Post.propTypes  = {
    type: PropTypes.string,
    MaxTime: PropTypes.number,
    time: PropTypes.number
};

export { Post };