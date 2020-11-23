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

export const AddTime = (props) => {

  AddTime.propTypes = {
    id: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const handleClose = () => {
    props.onClose();
  };

  const handleOnConfirmClick = () => {
    // call update()
    // TODO: Add increase time
    // use the update prop passed in to handle the new lifetime
    // Cast the event coming into a number
    // Update this number in the db
    // Re-render the timer with new value
    // Should time be passed in as a prop or should we update it's state?
  };

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
          Please input the amount of time you would like to extend the post.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="postLifetime"
          label="Extend post lifetime"
          type="number"
          required
          InputProps={{
            endAdornment: <InputAdornment position="end">sec</InputAdornment>,
          }}
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
          onClick={handleClose}
          // onClick={handleOnConfirmClick}
          className="ConfirmButton"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTime;
