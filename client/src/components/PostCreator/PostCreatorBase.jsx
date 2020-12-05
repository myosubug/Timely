import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';

import styles from "./PostCreatorStyles.module.css";
import { withStyles } from '@material-ui/styles';

const SelectButton = withStyles({
    root: {
        color: '#7ed3d6',
    }
})((props) => <Radio color="default" {...props} />);

const PostCreatorBase = (props) => {
    return (
        <div className={styles.container}>
            <RadioGroup row aria-label="position" name="position" defaultValue="top" className={styles.selectBtns}>
                <FormControlLabel
                    value="text"
                    checked={props.isText}
                    onChange={props.handleRadioClick}
                    control={<SelectButton />}
                    label="Text"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="img"
                    checked={!props.isText}
                    onChange={props.handleRadioClick}
                    control={<SelectButton />}
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

                <p id={styles.tag_header} className="font-semibold"> Tags </p>
                <input id={styles.tags_input_area} onChange={props.handleTagsChange}></input>
                <div>
                    <div className={styles.action_btn}>
                        <button
                            onClick={props.onCancel}
                            className="button-cancel text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
                            style={{ height: "3rem" }}>
                            <p style={{ padding: "0.1rem" }}> Cancel </p>
                        </button>
                    </div>
                    <div className={styles.action_btn}>
                        <button
                            type="submit"
                            className="button text-white text-2xl font-semibold mb-2 w-full text-center rounded cursor-pointer shadow-md"
                            style={{ height: "3rem" }}>
                            <p style={{ padding: "0.1rem" }}> Submit </p>
                        </button>
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