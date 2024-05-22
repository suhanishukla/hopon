import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FindRide from './pages/FindRide';
import Home from './pages/Home';
import PostRide from './pages/PostRide';
import Login from './pages/Login';
import SignUp from './pages/Signup'; // Import SignUp component
import Navbar from './components/Navbar'; // Adjust the path as necessary

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Find a Ride" component={FindRide} />
        <Route path="/Post a Ride" component={PostRide} />
        <Route path="/LogIn" component={Login} />
        <Route path="/SignUp" component={SignUp} /> {/* Route to SignUp component */}
      </Switch>
    </BrowserRouter>
  );
}
