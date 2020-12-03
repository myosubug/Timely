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
import Alert from '@material-ui/lab/Alert';
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

  const [alert, setAlert] = useState({
    message: "The user's password must be at least 3 characters long.",
    severity: "info"
  });

  const [isDeleted, setIsDeleted] = useState(false);

  // Resets the state when the modal is closed
  const handleClose = () => {
    props.onClose();
    setAlert({
      message: "The user's password must be at least 3 characters long.",
      severity: "info"
    });
  };

  // Function that handles the password change
  const handleOnConfirmClick = async () => {
    // Password doesn't meet requirements
    if (!document.getElementById('newPass').value || document.getElementById('newPass').value.length < 3) {
      setAlert({ message: "New password must be at least 3 characters.", severity: "error" });
      console.log("New password must be at least 3 characters.");
    }
    // Passwords don't match
    else if (document.getElementById('newPass').value !== document.getElementById('confirmPass').value) {
      setAlert({ message: "Passwords must match.", severity: "error" });
      console.log("Passwords must match.");
    }
    else {
      const data = { password: document.getElementById('newPass').value };
      // axios call 
      axios.post(SERVER_ADDRESS + '/users/update/pass/' + props.username, data)
        .then(res => {
          console.log("Axios: password successfully updated!");
          setAlert({ message: "Password successfully updated!", severity: "success" });
        })
        .catch(err => (console.log(err)))
      setIsDeleted(true);
    }
  };

  // Function that renders the current alert set in the state
  const renderAlert = () => (
    <Alert severity={alert.severity}>
      {alert.message}
    </Alert>
  );

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
        {renderAlert()}
      </DialogContent>
      <DialogActions>
      {isDeleted
          ?
          <Button
            onClick={handleClose}
            className="CloseButton"
          >
            Close
        </Button>
          :
          <>
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
          </>
        }
      </DialogActions>
    </Dialog>
  );
}

export default AdminEditPasswordModal;
