import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@material-ui/core';
import useStyles from './styles';

export const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" aria-label="menu" className={classes.button}>
          {/* Your icon component */}
        </IconButton>
        <Typography variant="h6" component="div" className={classes.typography} style={{ flexGrow: 1 }}>
          HopOn!
        </Typography>
        <Box>
          <Button color="inherit" className={classes.button}>
            <Typography variant="body1" className={classes.typography}>
              Find a Ride
            </Typography>
          </Button>
        </Box>
        <Box>
          <Button color="inherit" className={classes.button}>
            <Typography variant="body1" className={classes.typography}>
              Post a Ride
            </Typography>
          </Button>
        </Box>
        <Box>
          <Button color="inherit" className={classes.button}>
            <Typography variant="body1" className={classes.typography}>
              Log In
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
