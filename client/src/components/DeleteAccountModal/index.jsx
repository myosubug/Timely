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

export const DeleteAccountModal = (props) => {

  DeleteAccountModal.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    delete: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  // Resets the state when the modal is closed
  const handleClose = () => {
    props.onClose();
  };

  // Checks if the password is valid
  const isPasswordValid = () => {
    if (!document.getElementById('confirmPass').value || props.password !== document.getElementById('confirmPass').value) {
      console.log(document.getElementById('confirmPass'));
      console.log("Password is incorrect.");
      return false;
    }
    return true;
  }

  // Function that handles account deletion
  const handleOnConfirmClick = () => {
    if (isPasswordValid()) {
      console.log("Account successfully deleted!");
      props.delete(props.username);
      handleClose();
      // TODO: NEED TO REROUTE THE USER OR SOMETHING
    } else {
      console.log("Account failed to delete!");
    }
  };

  return(
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      onBackdropClick={handleClose}
      className="DeleteAccountModal"
      >
      <DialogTitle id="title">
        🚨 Delete account 🚨
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete your account? 
          This cannot be undone. 
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="confirmPass"
            label="Confirm password"
            type="password"
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
          onClick={handleOnConfirmClick}
          className="ConfirmButton"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAccountModal;