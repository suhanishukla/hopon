import React from 'react';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import useStyles from './styles';
import { NavBar } from './components/NavBar/navbar.jsx';
import { ReactTyped } from 'react-typed';


const App = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <NavBar />
            </AppBar>
            <h1>
                <ReactTyped
                strings={[
                    "Book your ride in seconds...",
                    "Affordable rides, anytime...",
                    "Share your journey...",
                    "Explore new destinations...",
                    "Ride with comfort...",
                    "Post a ride...",
                    "Effortless ride booking...",
                    "Hop in and ride on..."
                ]}
                typeSpeed={100}
                backSpeed={50}
                loop
                />
                </h1>
        </Container>
    );
}

export default App;