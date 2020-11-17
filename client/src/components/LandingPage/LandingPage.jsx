import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from '@material-ui/core';

import './LandingStyles.css'

const LandingPage = (props) => {


    return (
        <div>

            <div>
                <div className="p-2 mt-0 fixed w-full z-10 top-0 shadow-lg navbar">
                    <div className="flex justify-center text-white font-medium text-3xl">
                        <img width="150px" draggable="false" src="https://i.imgur.com/ATuMhih.png"></img>
                    </div>
                    </div>
            </div>


            <div className="flex">

                    <div className="h-screen top-0 pt-24 sticky p-4 w-2/12 border-r-2 border-gray-400" style={{backgroundColor: "#ededed"}}>
                        <div className="flex justify-center text-white mt-4 font-medium text-3xl">
                        <img width="150px;" draggable="false" src="https://i.imgur.com/ATuMhih.png"></img>
                        </div>

                        <div className="selector mt-4 ml-12 mb-8">

                        <div className="menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer">
                        <i className="fas fa-home" style={{paddingRight: "0.3rem", fontSize: "1.6rem"}}></i> Home
                        </div>

                        <div className="menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer">
                        <i className="far fa-bell pr-3" style={{fontSize: "1.6rem"}}></i> Notifications
                        </div>

                        <div className="menu-item text-2xl font-semibold text-gray-700 rounded-full px-3 py-2 cursor-pointer">
                        <i className="fas fa-fire pr-3" style={{fontSize: "1.6rem"}}></i> Trending
                        </div>

                    </div>

                    <div className="flex justify-center px-6">
                        <div
                        className="button text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
                        style={{height: "3.2rem"}}>
                        <p style={{paddingTop: "0.18rem"}}>Tags</p>
                        </div>
                    </div>

                    </div>

                    <div className="flex-grow justify-center px-56 pt-24 bg-white-300">
                    <div className="justify-center">

                        <div className="border-solid border-2 rounded-lg my-8 border-gray-300 h-48"></div>
                        <div className="border-solid border-2 rounded-lg my-8 border-gray-300 h-48"></div>
                        <div className="border-solid border-2 rounded-lg my-8 border-gray-300 h-48"></div>
                        <div className="border-solid border-2 rounded-lg my-8 border-gray-300 h-48"></div>
                        <div className="border-solid border-2 rounded-lg my-8 border-gray-300 h-48"></div>
                        <div className="border-solid border-2 rounded-lg my-8 border-gray-300 h-48"></div>
                        <div className="border-solid border-2 rounded-lg my-8 border-gray-300 h-48"></div>

                    </div>
                    </div>

                    <div className="h-screen top-0 sticky pt-32 p-4 w-2/12 border-l-2 border-gray-400" style={{backgroundColor: "#ededed"}}>
                
                        
                        <div className="flex mb-8">
                        <img className="place-self-center h-16 w-16 mr-6 ml-6 mt-2 rounded-full" src="https://i.imgur.com/Tj96CFr.png"></img>
                        <div className="text-left">
                            <h2 className="text-lg font-semibold text-gray-700 border-gray-400 pb-1 border-b-2">@notpavolfederl</h2>
                            <div className="text-gray-600" style={{marginTop: "0.2rem", fontSize: "13px"}}>
                            <p>Posts Active: <b className="text-gray-700">5</b></p>
                            <p>Posts Expired: <b className="text-gray-700">163</b></p>
                            </div>
                        </div>
                        </div>

                        <div className="flex justify-center px-6">
                        <div
                            className="button text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
                            style={{height: "3.2rem"}}>
                            <p style={{paddingTop: "0.18rem"}}>Create Post</p>
                        </div>
                        </div>

                    </div>

                </div>
            
        </div>
    );


}
export { LandingPage };