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

export const BanUserModal = (props) => {

  BanUserModal.propTypes = {
    username: PropTypes.string.isRequired,
    ban: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  // Resets the state when the modal is closed
  const handleClose = () => {
    props.onClose();
  };

  // Function that handles account deletion
  const handleOnConfirmClick = () => {
      console.log("Account successfully banned!");
      props.ban(props.username);
      handleClose();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      onBackdropClick={handleClose}
      className="BanUserModal"
    >
      <DialogTitle id="title">
        🚨 Ban user 🚨
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to ban this user?
          This cannot be undone.
        </DialogContentText>
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

export default BanUserModal;