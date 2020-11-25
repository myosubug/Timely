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
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Resets the state when the modal is closed
  const handleClose = () => {
    props.onClose();
    setPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
  };

  // Checks if the password is valid and checks if the passwords match
  const isPasswordValid = () => {
    if (props.password !== document.getElementById('currentPass').value) {
    // if(props.password !== currentPass) {
      console.log("Current password is incorrect.");
      return false;
    }
    if (!document.getElementById('newPass').value || document.getElementById('newPass').value.length < 3) {
      // if(!newPass || newPass < 3) {
        console.log("New password must be at least 3 characters.");
        return false;
      }
    if (document.getElementById('newPass').value !== document.getElementById('confirmPass').value) {
    // if(newPass !== confirmPass) {
      console.log("Passwords must match.");
      return false;
    }
    return true;
  }
  
  // Function that handles the password change
  const handleOnConfirmClick = () => {
    if (isPasswordValid()) {
      console.log("Password successfully updated!");
      props.update(newPassword, props.username);
      handleClose();
    } else {
      console.log("Password failed to update!");
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
            type="password"
            // onInput={(event) => setConfirmPassword(event.target.value)}
            fullWidth
            required
          />
        <TextField
            autoFocus
            margin="dense"
            id="newPass"
            label="New password"
            type="password"
            // onInput={(event) => setConfirmPassword(event.target.value)}
            fullWidth
            required
          />
        <TextField
            autoFocus
            margin="dense"
            id="confirmPass"
            label="Re-enter new password"
            type="password"
            // onInput={(event) => setConfirmPassword(event.target.value)}
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

export default EditPasswordModal;