import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone'
import { PostCreatorBase } from './PostCreatorBase';

import styles from "./PostCreatorStyles.module.css";

const PostCreator = (props) => {
    const [isText, setIsText] = useState(true);
    const [postTags, setPostTags] = useState([]);
    const [postText, setPostText] = useState();
    const [postImage, setPostImage] = useState();


    //Handle a click on the top radio buttons and set the state
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

    //Validates the tags and sets the current tags
    const handleTagsChange = (event) => {
        const tags = event.target.value.split(' ');
        let final_tags = [];
        for (let tag of tags) {
            if (tag !== "") {
                final_tags.push(tag);
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
            <PostCreatorBase isText={isText} handleRadioClick={handleRadioClick} handleTagsChange={handleTagsChange} onSubmit={onPostSubmit}>
                <textarea id={styles.text_input_area} placeholder="Start typing here..." onChange={handleTextChange}></textarea>
            </PostCreatorBase>
        );
    }
    //Else return with the image area
    else {
        return (
            <PostCreatorBase isText={isText} handleRadioClick={handleRadioClick} handleTagsChange={handleTagsChange} onSubmit={onPostSubmit}>
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