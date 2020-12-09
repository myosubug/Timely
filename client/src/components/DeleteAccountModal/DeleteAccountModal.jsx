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
import { SERVER_ADDRESS, resetLoggedInUser } from '../../AppConfig.js'

export const DeleteAccountModal = (props) => {

  DeleteAccountModal.propTypes = {
    username: PropTypes.string,
    delete: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const [alert, setAlert] = useState({
    message: "Please enter your current password.",
    severity: "info"
  });

  // Resets the state when the modal is closed
  const handleClose = () => {
    props.onClose();
  };

  // Function that checks if entered password is valid 
  // If valid make axios call and redirect user back to landing page
  const handleOnConfirmClick = () => {
    // Check if the passwords match
    axios.post(SERVER_ADDRESS + "/users/verifyUser", { username: props.username, password: document.getElementById("confirmPass").value })
      .then(({ data }) => {
        if (data) {
          axios.post(SERVER_ADDRESS + "/users/delete/" + props.username)
            .then(() => {
              // Password is valid 
              setAlert({ message: "Account successfully deleted!", severity: "success" });
              console.log("Account successfully deleted!");
              props.delete(props.username);
              resetLoggedInUser();
              handleClose();
              window.location.href = '/'; // relative to domain
            }
            )
            .catch(err => console.log(err));
        }
        else {
          setAlert({ message: "Password is incorrect. Please try again!", severity: "error" });
        }
      });


  };

  // Function that renders the alert to the user based on its current state
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
      className="DeleteAccountModal"
    >
      <DialogTitle id="title">
        <span role="img" aria-label="alarm"> 🚨 </span> Delete account <span role="img" aria-label="alarm"> 🚨 </span>
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
        {renderAlert()}
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
