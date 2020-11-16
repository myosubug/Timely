import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';

import styles from "./PostCreatorStyles.module.css";

const PostCreatorBase = (props) => {
    return (
        <div className={styles.container}>
            <RadioGroup row aria-label="position" name="position" defaultValue="top" className={styles.selectBtns}>
                <FormControlLabel
                    value="text"
                    checked={props.isText}
                    onChange={props.handleRadioClick}
                    control={<Radio color="primary" />}
                    label="Text"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="img"
                    checked={!props.isText}
                    onChange={props.handleRadioClick}
                    control={<Radio color="primary" />}
                    label="Image"
                    labelPlacement="start"
                />

            </RadioGroup>
            <form onSubmit={props.onSubmit}>
                <div id={styles.inputs_area}>
                    {props.children}
                </div>

                <h2> Tags </h2>
                <input id={styles.tags_input_area} onChange={props.handleTagsChange}></input>
                <div>
                    <div className={styles.action_btn}>
                        <Button variant="contained" color="secondary" > Cancel</Button>
                    </div>
                    <div className={styles.action_btn}>
                        <Button variant="contained" color="primary" type="submit" > Submit </Button>
                    </div>
                </div>

            </form>
        </div>
    );
}


export { PostCreatorBase };