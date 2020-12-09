import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone'
import { PostCreatorBase } from './PostCreatorBase';
import { SERVER_ADDRESS, loggedInUser } from '../../AppConfig.js'
import axios from 'axios';

import styles from "./PostCreatorStyles.module.css";

const PostCreator = (props) => {
    const [isText, setIsText] = useState(true);
    const [postTags, setPostTags] = useState([]);
    const [postText, setPostText] = useState();
    const [postImage, setPostImage] = useState();
    const [errorMsg, setErrorMsg] = useState("");


    //Handle a click on the top radio buttons and set the state
    const handleRadioClick = (event) => {
        if (event.target.value === "text") {
            setIsText(true);
        }
        else {
            setIsText(false);
        }

        setErrorMsg("");
        setPostImage(undefined);
        setPostText(undefined);
    }

    //Handles what happens the user clicks on submit
    const onPostSubmit = (e) => {
        e.preventDefault();
        //Check if the content is empty
        if (isText && (postText === "" || postText === undefined)) {
            setErrorMsg("Text field cannot be empty");
            return;
        }
        else if (!isText && postImage === undefined) {
            setErrorMsg("Please select an image to upload");
            return;
        }

        //If we reach this stage the post has been validated
        setErrorMsg("");



        //Prepare basic post data
        const post = {
            username: loggedInUser.username,
            dateCreated: new Date().toUTCString(),
            type: isText ? "text" : "img",
            textContent: isText ? postText : "",
            tags: [...new Set(postTags)] //Elimiate any duplicate tags
        };

        axios.post(SERVER_ADDRESS + "/posts/add", post)
            .then((res) => {

                const name = res.data;
                //now that the post has been added, add the image
                //If the data is of type image, upload it in a seperate request
                if (!isText) {
                    const imgData = new FormData();
                    imgData.append('myFile', postImage);
                    axios.post(SERVER_ADDRESS + "/posts/upload-post/" + name, imgData)
                        .catch(err => console.log(err));
                }
                props.onCancel()
            })
            .catch((err) => console.log(err));
    }

    //Validates the tags and sets the current tags
    const handleTagsChange = (event) => {
        const tags = event.target.value.split(' ');
        let final_tags = [];
        for (let tag of tags) {
            if (tag !== "") {
                const tag_ar = tag.split(",");
                for (let sub_tag of tag_ar) {
                    if (sub_tag !== "") {
                        final_tags.push(sub_tag);
                    }

                }

            }
        }

        //Update the list of tags with the non-empty tags
        setPostTags(final_tags);
    }

    const handleTextChange = (event) => {
        //Set the post message
        setPostText(event.target.value);

    }

    //Return the components JSX

    //If it is of type text, return with the text area
    if (isText) {
        return (
            <PostCreatorBase isText={isText} handleRadioClick={handleRadioClick} handleTagsChange={handleTagsChange} onSubmit={onPostSubmit} errorMsg={errorMsg} onCancel={props.onCancel}>
                <textarea id={styles.text_input_area} placeholder="Start typing here..." onChange={handleTextChange}></textarea>
            </PostCreatorBase>
        );
    }
    //Else return with the image area
    else {
        return (
            <PostCreatorBase isText={isText} handleRadioClick={handleRadioClick} handleTagsChange={handleTagsChange} onSubmit={onPostSubmit} errorMsg={errorMsg} onCancel={props.onCancel}>
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    filesLimit={1}
                    maxFileSize={5000000}
                    onChange={(files) => { setPostImage(files[0]) }}
                    showAlerts={false}
                />
            </PostCreatorBase>
        );
    }
}


export { PostCreator };