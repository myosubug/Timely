import React, { createRef, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { loggedInUser } from '../../AppConfig.js'
import { UserOverviewEdit } from './UserOverviewEdit.jsx';
import { UserOverviewAdmin } from './UserOverviewAdmin.jsx';
import { UserOverviewView } from './UserOverviewView.jsx';


function OverviewRouter() {

  let { username } = useParams();

  const renderOverview = () => {
    if (loggedInUser.username === username) {
      return (<UserOverviewEdit username={username} />);
    }
    else if (loggedInUser.isAdmin) {
      return (<UserOverviewAdmin username={username} />);
    }
    else {
      return (<UserOverviewView username={username} />);
    }
  };

  return (
    <div>
      { renderOverview()}
    </div>
  );

}

export default OverviewRouter;