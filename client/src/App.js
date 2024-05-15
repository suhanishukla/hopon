import React from 'react';
import { ReactTyped } from 'react-typed';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import logo from './images/logo.png'
import useStyles from './styles';

const App = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" className={classes.heading}  align="left">
                    HopOn
                </Typography>
                <img src={logo} className={classes.image} alt="logo" height="60" width="60"/>
            </AppBar>
        </Container>
    );
}

export default App;