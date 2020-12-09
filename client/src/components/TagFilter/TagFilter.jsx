import React from 'react';
import {
    IconButton,
    OutlinedInput,
    InputAdornment,
    Container
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import styles from './TagFilterStyles.module.css';

import axios from 'axios';
import { SERVER_ADDRESS } from '../../AppConfig.js'

/**
 * TagFilter Overlay used to filter posts by hashtag
 * When DB integration added, onEnter callback can be used to populate
 * tag list for buttons
 */

export default function TagFilter(props) {

    React.useEffect(() => {
        axios.get(SERVER_ADDRESS + '/posts/tags')
            .then(res => {
                let tags = [];
                for (let retrievedTag of res.data) {
                    tags.push({
                        "tag": retrievedTag,
                        "isSelected": false
                    });
                }

                setTags([]);
                setTags(tags);

            })
            .catch(err => console.log(err));
    }, []);

    const [values, setValues] = React.useState({
        input: ''
    });

    const [tags, setTags] = React.useState([]);

    const [errorMsg, setErrorMsg] = React.useState("");

    const handleClearInput = () => {
        setValues({ ...values, input: '' });
    }

    const handleInputChange = (event) => {
        setValues({ ...values, input: event.target.value });
    }

    const handleSearch = () => {
        let inputTags = values.input.trim().split(' ');

        let clickedTags = [...tags];
        let completedQuery = "?";
        for (let i of clickedTags) {
            if (i.isSelected) {
                inputTags.push(i.tag);
            }
        }

        if (inputTags.length === 1) {
            setErrorMsg("Must search for at least one tag.");
            return;
        }
        inputTags.forEach((item, index) => {
            if (item !== "") {
                completedQuery += "tag=" + item;
            }
            if (index !== inputTags.length - 1) {
                completedQuery += "&";
            }
        });
        props.queryTags("/posts/find-tag/" + completedQuery);

        setValues({ ...values, open: false, input: '' });
        setErrorMsg("");
        props.onCancel();
    }

    const handleGetTags = () => {
        //setTags([]);
        axios.get(SERVER_ADDRESS + "/posts/seach-tags?tag=" + values.input)
            .then(({ data }) => {
                let tags = [];
                for (let retrievedTag of data) {
                    tags.push({
                        "tag": retrievedTag,
                        "isSelected": false
                    });
                }
                setTags(tags);
            })
            .catch(err => console.log(err));
    }

    const handleTagClick = (index) => {
        let newTags = [...tags];
        newTags[index].isSelected = !newTags[index].isSelected;
        setTags([]);
        setTags(newTags);
    }

    return (
        <div>
            <Container id={styles.container} maxWidth="lg">
                <div>
                    <div className="flex justify-center text-3xl font-semibold text-gray-700 rounded-full pb-4 cursor-pointer">
                        <i className="pr-0" />
                            Post Filter
                    </div>
                    <div className="flex justify-center text-xl  text-gray-700 rounded-full pb-5 cursor-pointer">
                        <i className="pr-0" />
                            To filter your posts, use the search bar or click one of the active tags below.
                    </div>
                    <div id="input-wrapper" className={styles.inputWrapper}>
                        <OutlinedInput
                            autoFocus
                            margin="none"
                            id="name"
                            className={styles.filterInput}
                            value={values.input}
                            onChange={handleInputChange}
                            placeholder="Search"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClearInput}>
                                        <ClearIcon

                                        />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <IconButton onClick={handleGetTags}>
                            <SearchIcon

                            />
                        </IconButton>
                    </div>
                    <div id="tag-button-container" className={styles.tagsWrapperDiv}>
                        {tags.map((tag, index) => {
                            return (
                                tag.isSelected ?
                                    <button className={styles.filterButtonSelected}
                                        onClick={() => handleTagClick(index)}
                                        key={index}
                                    >
                                        {tag.tag}
                                    </button>
                                    :
                                    <button className={styles.filterButton}
                                        onClick={() => handleTagClick(index)}
                                        key={index}
                                    >
                                        {tag.tag}
                                    </button>
                            );
                        })}
                    </div>
                    <div className={styles.error_msg}>
                        <p> {errorMsg === "" ? <span>&nbsp;</span> : errorMsg} </p>
                    </div>
                    <div className={styles.tagFilterActionDiv}>
                        <button
                            onClick={props.onCancel}
                            className="button-cancel text-white text-2xl font-semibold mb-2 text-center rounded cursor-pointer shadow-md"
                            style={{ height: "3rem", padding: " 0 1rem 0 1rem", margin: "10px" }}>
                            <p style={{ padding: "0.1rem" }}> Cancel </p>
                        </button>

                        <button
                            onClick={handleSearch}
                            className="button text-white text-2xl font-semibold mb-2 text-center rounded cursor-pointer shadow-md"
                            style={{ height: "3rem", padding: " 0 1rem 0 1rem", margin: "10px" }}>
                            <p style={{ padding: "0.1rem" }}> Confirm </p>
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

