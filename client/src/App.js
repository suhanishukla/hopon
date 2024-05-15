import React from 'react';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import useStyles from './styles';
import { NavBar } from './components/NavBar/navbar.jsx';

const App = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                
                <NavBar />
            </AppBar>
        </Container>
    );
}

export default App;