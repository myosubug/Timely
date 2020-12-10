import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

export const PromotePost = (props) => {

  PromotePost.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const handleClose = () => {
    props.onClose();
  };

  const handleOnConfirmClick = () => {
    props.onConfirm();
    props.onClose();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      onBackdropClick={handleClose}
      className="PromotePost"
    >
      <DialogTitle id="title">
        Promote Post
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to promote this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          className="CancelButton focus:outline-none"
        >
          Cancel
        </Button>
        <Button
          onClick={handleOnConfirmClick}
          className="ConfirmButton focus:outline-none"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PromotePost;
