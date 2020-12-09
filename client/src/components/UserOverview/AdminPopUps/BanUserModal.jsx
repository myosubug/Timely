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

export const BanUserModal = (props) => {

  BanUserModal.propTypes = {
    username: PropTypes.string.isRequired,
    ban: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const [alert, setAlert] = useState({
    message: "Banning a user will delete them from the server.",
    severity: "info"
  });

  const [isDeleted, setIsDeleted] = useState(false);

  const [isBanned, setIsBanned] = useState(false);

  // Resets the state when the modal is closed
  const handleClose = () => {
    props.onClose();
    setAlert({
      message: "Banning a user will delete them from the server.",
      severity: "info"
    });
    if (isBanned) {
      window.location.href = '/'; // relative to domain
      setIsBanned(false);
    }
  };

  // Function that handles account deletion
  const handleOnConfirmClick = () => {
    console.log("Account successfully banned!");
    setAlert({ message: "Account successfully banned!", severity: "success" });
    props.ban(props.username);
    setIsDeleted(true);
    setIsBanned(true);
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
      className="BanUserModal"
    >
      <DialogTitle id="title">
        <span role="img" aria-label="alarm"> 🚨 </span> Ban user <span role="img" aria-label="alarm"> 🚨 </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to ban this user?
          This cannot be undone.
        </DialogContentText>
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

export default BanUserModal;
