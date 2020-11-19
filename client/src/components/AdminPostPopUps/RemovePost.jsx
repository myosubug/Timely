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

export const RemovePost = (props) => {

RemovePost.propTypes = {
  id: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

  const handleClose = () => {
    props.onClose();
  };

  const handleOnConfirmClick = () => {
    // TODO: make a call to db to remove the post
    // call update()
  };

  return(
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      onBackdropClick={handleClose}
      className="RemovePost"
      >
      <DialogTitle id="title">
        Remove Post
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        Are you sure you want to remove this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose}
          className="CancelButton"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleClose}
          // onClick={handleOnConfirmClick}
          className="ConfirmButton"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemovePost;
