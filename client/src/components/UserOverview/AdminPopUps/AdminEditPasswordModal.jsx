import React from 'react';
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
import axios from 'axios';
import { SERVER_ADDRESS } from '../../../AppConfig';

export const AdminEditPasswordModal = (props) => {

  AdminEditPasswordModal.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  // Resets the state when the modal is closed
  const handleClose = () => {
    props.onClose();
  };

  // Checks if the password is valid and checks if the passwords match
  const isPasswordValid = () => {
    if (!document.getElementById('newPass').value || document.getElementById('newPass').value.length < 3) {
      console.log("New password must be at least 3 characters.");
      return false;
    }
    if (document.getElementById('newPass').value !== document.getElementById('confirmPass').value) {
      console.log("Passwords must match.");
      return false;
    }
    return true;
  }

  // Function that handles the password change
  const handleOnConfirmClick = () => {
    if (isPasswordValid()) {
      const data = { password: document.getElementById('newPass').value };
      console.log(data);
      // axios call 
      axios.post(SERVER_ADDRESS + '/users/update/pass/' + props.username, data)
        .then(res => {
          console.log(res.data);
          console.log("Axios: password successfully updated!")
        })
        .catch(err => (console.log(err)))
      handleClose();
    } else {
      console.log("Password failed to update!");
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      onBackdropClick={handleClose}
      className="AdminEditPasswordModal"
    >
      <DialogTitle id="title">
        Change user's password
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the new password to confirm these changes.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="newPass"
          label="New password"
          type="password"
          fullWidth
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="confirmPass"
          label="Re-enter new password"
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

export default AdminEditPasswordModal;
