import React from 'react';
import { 
  Typography,
  Grid,
 } from '@material-ui/core'

export const NotFound = () => {

return (
  <Grid
    container
    justify="center"
    direction="column"
    alignItems="center"
    spacing={2}
  >
  <Grid item />
  <Grid item>
    <img
      src="https://i.kym-cdn.com/photos/images/newsfeed/001/056/730/597.jpg"
      className="NotFound"
      alt="Page Not Found"
      width=""
    />
  </Grid>
  <Grid item>
    <Typography variant="h3">
      Page not found
    </Typography>
  </Grid>
  <Grid item>
    <Typography variant="h5">
      The page you requested does not exist.
    </Typography>
  </Grid>
  </Grid>
);
}

export default NotFound;
