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

export const EditPasswordModal = (props) => {

  EditPasswordModal.propTypes = {
  userId: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

  const handleClose = () => {
    props.onClose();
  };

  const isPasswordValid = () => {
  //  Check if passwords match
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
      className="EditPasswordModal"
      >
      <DialogTitle id="title">
        Change your password
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your current and new password to confirm these changes.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="currentPass"
            label="Current password"
            fullWidth
            required
          />
        <TextField
            autoFocus
            margin="dense"
            id="newPass"
            label="New password"
            fullWidth
            required
          />
        <TextField
            autoFocus
            margin="dense"
            id="confirmNewPass"
            label="Re-enter new password"
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

export default EditPasswordModal;