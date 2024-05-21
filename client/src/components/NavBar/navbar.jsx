import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@material-ui/core';
import useStyles from './styles';


export const NavBar = () => {
  const myStyle = {
    fontFamily: 'Arial, sans-serif',
    color: 'white',
    flexGrow: 1, 
  }
  return (
    <AppBar >
      <Toolbar>
        <IconButton edge="start" aria-label="menu">
          {/* Your icon component */}
        </IconButton>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          HopOn!
        </Typography>
        <Box>
          <Button color="inherit" >
            <Typography variant="body1">
              Find a Ride
            </Typography>
          </Button>
        </Box>
        <Box>
          <Button color="inherit">
            <Typography variant="body1">
              Post a Ride
            </Typography>
          </Button>
        </Box>
        <Box>
          <Button color="inherit">
            <Typography variant="body1">
              Log In
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
