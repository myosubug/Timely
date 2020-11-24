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
  id: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

  const handleClose = () => {
    props.onClose();
  };

  const handleOnConfirmClick = () => {
    // TODO: send the post to index 0 of the list of all posts?
    // call update()
  };

  return(
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

export default PromotePost;
