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

  const [newUsername, setUsername] = useState('');
  const [password, setConfirmPassword] = useState('');

  // Reset the state when the modal is closed
  const handleClose = () => {
    props.onClose();
    setUsername('');
    setConfirmPassword('');
  };

  // Check if the username is valid and password is correct
  const isUsernameValid = () => {
    if(!document.getElementById('newUser').value || document.getElementById('newUser').value.length < 3) {
      console.log("New username must be at least 3 characters.");
      return false;
    }
    if(document.getElementById('confirmPass').value !== props.password) {
      console.log('Password is incorrect.');
      return false;
    }
    return true;
  };

  // Function that handles the update of a username
  const handleOnConfirmClick = () => {
    if (isUsernameValid()) {
      console.log("Username successfully updated!");
      props.update(newUsername, props.username);
      handleClose();
    } else {
      console.log("Username failed to update!");
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

export default EditUsernameModal;