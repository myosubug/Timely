import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const SubTime = (props) => {

  const [time, setTime] = useState(0);
  const [errorMsg, setErrormsg] = useState("");

  SubTime.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const handleClose = () => {
    props.onClose();
  };

  const handleOnConfirmClick = () => {
    if (time <= 0) {
      setErrormsg("Number of seconds must be a postive number");
      return;
    }

    setErrormsg("");
    setTime(0);
    props.onConfirm(time);
    props.onClose();

  };

  const onTextChange = (e) => {
    setTime(e.target.value);
  }

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      onBackdropClick={handleClose}
      className="AddTime"
    >
      <DialogTitle id="title">
        Add Time
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please input the amount of time you would like to subtract from the post.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="postLifetime"
          label="Extend post lifetime"
          type="number"
          required
          InputProps={{
            endAdornment: <InputAdornment position="end">sec</InputAdornment>
          }}
          error={errorMsg !== ""}
          helperText={errorMsg}
          onChange={onTextChange}
        >
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          className="CancelButton"
        >
          Cancel
        </Button>
        <Button
          onClick={handleOnConfirmClick}
          // onClick={handleOnConfirmClick}
          className="ConfirmButton"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubTime;
