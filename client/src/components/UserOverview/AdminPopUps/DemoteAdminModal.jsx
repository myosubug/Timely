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

export const DemoteAdminModal = (props) => {

  DemoteAdminModal.propTypes = {
    username: PropTypes.string.isRequired,
    demote: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  // Resets the state when the modal is closed
  const handleClose = () => {
    props.onClose();
  };

  // Function that handles account deletion
  const handleOnConfirmClick = () => {
      console.log("Account successfully demoted!");
      props.demote(props.username);
      handleClose();
  };

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

export default DemoteAdminModal;