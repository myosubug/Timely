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
import { resetLoggedInUser } from '../../AppConfig';

export const DeleteAccountModal = (props) => {

  DeleteAccountModal.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
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
    setAlert({
      message: "Please enter your current password.",
      severity: "info"
    });
    props.onClose();
  };

  // Function that checks if entered password is valid 
  // If valid make axios call and redirect user back to landing page
  const handleConfirm = () => {
    // Password is invalid
    // if (!document.getElementById('confirmPass').value || props.password !== document.getElementById('confirmPass').value) {
    //   console.log(document.getElementById('confirmPass'));
    //   setAlert({message: "Password is incorrect. Please try again!", severity: "error"});
    // }
    // // Password is valid 
    // else {
      setAlert({message: "Account successfully deleted!", severity: "success"});
      console.log("Account successfully deleted!");
      props.delete(props.username);
      handleClose();
      resetLoggedInUser();
      window.location.href = '/' ; // relative to domain
    // }
  }

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
          onClick={handleConfirm}
          className="ConfirmButton"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAccountModal;