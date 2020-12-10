import React, { useState, useEffect } from 'react';
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
import { SERVER_ADDRESS } from '../../AppConfig.js'

export const EditPasswordModal = (props) => {

  EditPasswordModal.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const [alert, setAlert] = useState({
    message: "Your password must be at least 3 characters long.",
    severity: "info"
  });

  const [isDeleted, setIsDeleted] = useState(false);


  useEffect(() => {
    if (props.isOpen) {
      setIsDeleted(false);
      setAlert({
        message: "Your password must be at least 3 characters long.",
        severity: "info"
      });
    }


  }, [props.isOpen])

  // Resets the state when the modal is closed
  const handleClose = () => {
    props.onClose();
  };

  // Function that handles the password change
  const handleOnConfirmClick = () => {

    if (document.getElementById('currentPass').value !== "") {
      //Check if the passwords match
      axios.post(SERVER_ADDRESS + "/users/verifyUser", { username: props.username, password: document.getElementById('currentPass').value })
        .then(({ data }) => {
          //Check if the enntered password matches with the old one
          if (data) {
            // Check if new password meets requirements
            if (!document.getElementById('newPass').value || document.getElementById('newPass').value.length < 3) {
              setAlert({ message: "New password must be at least 3 characters.", severity: "error" });
            }
            // Passwords don't match
            else if (document.getElementById('newPass').value !== document.getElementById('confirmPass').value) {
              setAlert({ message: "New passwords must match.", severity: "error" });
            }
            // Passwords match and is updated
            else {
              const data = { password: document.getElementById('newPass').value };
              // axios call 
              axios.post(SERVER_ADDRESS + '/users/update/pass/' + props.username, data)
                .then(() => {
                  setAlert({ message: "Password successfully updated!", severity: "success" });
                })
                .catch(err => (console.log(err)))
              setIsDeleted(true);
            }
          }
          else {
            setAlert({ message: "Current password does not match.", severity: "error" });
          }
        })
        .catch(err => console.log(err));
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
          fullWidth
          required
        />
        <TextField
          margin="dense"
          id="newPass"
          label="New password"
          type="password"
          fullWidth
          required
        />
        <TextField
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
            className="CloseButton focus:outline-none"
          >
            Close
        </Button>
          :
          <>
            <Button
              onClick={handleClose}
              className="ConfirmButton focus:outline-none"
            >
              Cancel
            </Button>
            <Button
              onClick={handleOnConfirmClick}
              className="ConfirmButton focus:outline-none"
            >
              Confirm
            </Button>
          </>
        }
      </DialogActions>
    </Dialog>
  );
}

export default EditPasswordModal;
