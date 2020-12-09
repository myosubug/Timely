import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { loggedInUser, SERVER_ADDRESS } from '../../AppConfig.js'
import { UserOverviewEdit } from './UserOverviewEdit.jsx';
import { UserOverviewAdmin } from './UserOverviewAdmin.jsx';
import { UserOverviewView } from './UserOverviewView.jsx';
import axios from 'axios';
import NotFound from '../NotFound/NotFound.jsx';
import { CircularProgress, Grid } from '@material-ui/core';
import './OverviewRouter.css';

const load =
  <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
  >
    <CircularProgress className="CircularProgress" />
  </Grid>

function OverviewRouter() {

  let { username } = useParams();

  const [ret, setRet] = useState(load);

  useEffect(() => {

    axios.get(SERVER_ADDRESS + "/users/findUser/" + username)
      .then(({ data }) => {
        if (data) {
          if (loggedInUser.username === username) {
            setRet(<UserOverviewEdit username={username} />);
          }
          else if (loggedInUser.isAdmin) {
            setRet(<UserOverviewAdmin username={username} />);
          }
          else {
            setRet(<UserOverviewView username={username} />);
          }
        }
        else {
          setRet(<NotFound />)
        }

      })
      .catch(err => console.log(err));
  }, [username]);



  return (
    <div>
      { ret}
    </div>
  );

}

export default OverviewRouter;