import React from 'react';
import PropTypes from 'prop-types';
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
                <div id={styles.error_msg}>
                    <p> {props.errorMsg === "" ? <span>&nbsp;</span> : props.errorMsg} </p>
                </div>

                <h2> Tags </h2>
                <input id={styles.tags_input_area} onChange={props.handleTagsChange}></input>
                <div>
                    <div className={styles.action_btn}>
                        <Button variant="contained" color="secondary" onClick={props.onCancel}> Cancel</Button>
                    </div>
                    <div className={styles.action_btn}>
                        <Button variant="contained" color="primary" type="submit" > Submit </Button>
                    </div>
                </div>



            </form>
        </div>
    );
}

PostCreatorBase.propTypes = {
    isText: PropTypes.bool,
    handleRadioClick: PropTypes.func,
    onSubmit: PropTypes.func,
    errorMsg: PropTypes.string,
    onCancel: PropTypes.func,
};


export { PostCreatorBase };