import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone'
import { PostCreatorBase } from './PostCreatorBase';

import "./PostCreatorStyles.css";

const PostCreator = (props) => {
    const [isText, setIsText] = useState(true);
    const [postText, setPostText] = useState();
    const [postImage, setPostImage] = useState();


    const handleRadioClick = (event) => {
        if (event.target.value === "text") {
            setIsText(true);
        }
        else {
            setIsText(false);
        }
    }

    const onPostSubmit = () => {
        //TODO: Push changes to database

    }

    const handFileChange = (files) => {
        //TODO: Prepare to log to database

    }

    const handleTextChnage = (event) => {
        //Set the post message
        setPostText(event.target.value);

    }

    //Return the components JSX

    //If it is of type text, return with the text area
    if (isText) {
        return (
            <PostCreatorBase isText={isText} handleRadioClick={handleRadioClick} >
                <textarea id="text_input_area" placeholder="Start typing here..." onChange={handleTextChnage}></textarea>
            </PostCreatorBase>
        );
    }
    //Else return with the image area
    else {
        return (
            <PostCreatorBase isText={isText} handleRadioClick={handleRadioClick} onSubmit={onPostSubmit}>
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    filesLimit={1}
                    onChange={(files) => handFileChange(files)}
                    maxFileSize={5000000}
                    onChange={(files) => { setPostImage(files[0]) }}
                />
            </PostCreatorBase>
        );
    }
}


export { PostCreator };