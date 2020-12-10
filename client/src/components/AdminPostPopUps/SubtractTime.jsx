import React, { useState } from 'react';
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

export const SubTime = (props) => {

  const [time, setTime] = useState(0);
  const [errorMsg, setErrormsg] = useState("");

  SubTime.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const handleClose = () => {
    setErrormsg("");
    props.onClose();
  };

  const handleOnConfirmClick = () => {
    if (time <= 0) {
      setErrormsg("Number of seconds must be a postive number");
      return;
    }

    if (time > 10800) {
      setErrormsg("You can only subtract the post by a maximum of 10800 seconds (3h) at a time");
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
        Subtract Time
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please input the amount of time you would like to subtract from the post.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="postLifetime"
          label="Subtract from post lifetime"
          type="number"
          required
          InputProps={{
            endAdornment: <InputAdornment position="end">sec</InputAdornment>
          }}
          error={errorMsg !== ""}
          helperText={errorMsg}
          onChange={onTextChange}
          className="w-full"
        >
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          className="CancelButton focus:outline-none"
        >
          Cancel
        </Button>
        <Button
          onClick={handleOnConfirmClick}
          className="ConfirmButton focus:outline-none"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubTime;
