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

  const handleClose = () => {
    props.onClose();
  };

  const handleOnConfirmClick = () => {
    if (props.password) {
      // TODO: DELETE ACCOUNT IN DB
    } else {
      // TODO: DON'T DO ANYTHING
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

export default DeleteAccountModal;