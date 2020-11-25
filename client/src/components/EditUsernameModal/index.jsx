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

export const EditUsernameModal = (props) => {

  EditUsernameModal.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

  const [newUserName, setUsername] = useState('');

  const handleClose = () => {
    props.onClose();
  };

  const isUsernameValid = () => {
  //  Check if username is valid 
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
      className="EditUsernameModal"
      >
      <DialogTitle id="title">
        Change your username
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your new username and password to confirm these changes.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="newUser"
            label="New username"
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

export default EditUsernameModal;