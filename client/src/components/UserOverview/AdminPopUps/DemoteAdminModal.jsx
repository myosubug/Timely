import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

export const DemoteAdminModal = (props) => {

  DemoteAdminModal.propTypes = {
    username: PropTypes.string.isRequired,
    demote: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const [alert, setAlert] = useState({
    message: "You can promote the user at any time.",
    severity: "info"
  });

  // Resets the state when the modal is closed
  const handleClose = () => {
    props.onClose();
  };

  // Function that handles account deletion
  const handleOnConfirmClick = () => {
    console.log("Account successfully demoted!");
    setAlert({ message: "User successfully demoted!", severity: "success" });
    props.demote(props.username);
    handleClose();
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
      className="DemoteAdminModal"
    >
      <DialogTitle id="title">
        🚨 Demote user 🚨
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to demote this user?
        </DialogContentText>
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

export default DemoteAdminModal;