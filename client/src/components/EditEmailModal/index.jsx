import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

export const EditEmailModal = (props) => {

  EditEmailModal.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

  const handleClose = () => {
    props.onClose();
  };

  const isEmailValid = () => {
  //  Check if email is valid 
  }

  const handleOnConfirmClick = () => {
    if (props.password) {
      // TODO: UPDATE ACCOUNT IN DB
    } else {
      // TODO: DON'T DO ANYTHING
    }
  };

  return(
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      onBackdropClick={handleClose}
      className="EditEmailModal"
      >
      <DialogTitle id="title">
        Change your email address
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the new email address and password to confirm these changes.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="newEmail"
            label="New email address"
            fullWidth
            required
          />
        <TextField
            autoFocus
            margin="dense"
            id="confirmPass"
            label="Current password"
            fullWidth
            required
          />
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose}
          className="ConfirmButton"
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

export default EditEmailModal;