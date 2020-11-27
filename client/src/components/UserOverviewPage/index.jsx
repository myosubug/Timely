import React, { Component } from 'react';
import {
  Avatar,
  Grid,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import './style.css';

export class UserOverviewPage extends Component {
  static propTypes = {
    // Could probably make some sort of user data structure to be passed in
    // Rather than passing in props for each field
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    memberStatus: PropTypes.string.isRequired,
    posts: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    postActivity: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isDeleteOpen: false,
      isEditEmailOpen: false,
      isEditUserOpen: false,
      isEditPassOpen: false,
    };
  }


  // DELETE MODAL STATE HANDLER
  openDeleteModal = () => {
    this.setState({ 
      isDeleteOpen: true });
  };

  closeDeleteModal = () => {
    this.setState({
      isDeleteOpen: false,
    });
  }

  // EDIT EMAIL STATE HANDLER
  openEmailModal = () => {
    this.setState({ 
      isEditEmailOpen: true });
    };
    
    closeEmailModal = () => {
      this.setState({
        isEditEmailOpen: false,
      });
    }

    // EDIT USERNAME STATE HANDLER
  openUserModal = () => {
    this.setState({ 
      isEditUserOpen: true });
    };
    
    closeUserModal = () => {
      this.setState({
        isEditUserOpen: false,
      });
    }
    
    // EDIT PASSWORD STATE HANDLER
  openPassModal = () => {
    this.setState({ 
      isEditPassOpen: true });
    };
    
    closePassModal = () => {
      this.setState({
        isEditPassOpen: false,
      });
    }
    


  renderProfileGrid = () => {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs className="ProfilePic">
          <Avatar
            alt="Patrick"
            src={"https://pyxis.nymag.com/v1/imgs/0f9/f96/029acbf4c6d8c67e138e1eb06a277204bf-05-patrick.rsocial.w1200.jpg"}
            className="avatar"
          />
          {/* TODO Change profile pic button*/}
        </Grid>
      </Grid>
    );
  }

  renderUserGrid = () => {
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        <Grid item xs className="UserInfo">
          <Typography variant="h5" component="span">
            {"@" + this.props.username}
          </Typography>
            {this.props.isAdmin ? " 👑 " : ""}
          <Typography variant="body1">
            {"Member since " + this.props.memberStatus}
          </Typography>
          <Typography variant="body1">
            {this.props.posts + " posts"}
          </Typography>
        </Grid>

        <Grid item xs className="UserActions">
          {this.renderUserActions()}
        </Grid>
      </Grid>
    )
  }

  renderUserActions = () => {
    return (
      <div>
        {/* Edit Email */}
        <Grid container spacing={1}>
          <Grid item xs>
            <Typography variant="h6">Email</Typography>
            {this.props.email}
          </Grid>
        </Grid>

        {/* Post Activity */}
        <Grid container spacing={1}>
          <Grid item xs>
            <Typography variant="h6">Post Activity</Typography>
            {this.props.postActivity}
            </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div className="UserOverviewPage">
        <Grid container className="header">
          <Typography variant="h4" align="center" className="headerTitle">
            User Overview
          </Typography>
        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          className="DisplayGrid"
        >
          <Grid item xs={1} />
          <Grid item xs={3} className="ProfileGrid">
            {/* 1. Profile picture Grid and delete account button */}
            {this.renderProfileGrid()}
          </Grid>
          <Grid item xs={7} className="UserInfoGrid">
            {/* 2. User Info */}
            {this.renderUserGrid()}
          </Grid>
          <Grid item xs={1} />
        </Grid>       
      </div>
    );
  }
}

