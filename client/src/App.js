import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FindRide from './pages/FindRide';
import Home from './pages/Home';
import PostRide from './pages/PostRide';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import YourRides from './pages/YourRides'; // Import YourRides component
import Navbar from './components/Navbar';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!sessionStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/LogIn" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Find a Ride" element={<FindRide/>} />
        <Route path="/Post a Ride" element={<PrivateRoute element={<PostRide />} />} />
        <Route path="/your-rides" element={<PrivateRoute element={<YourRides />} />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/YourRides" element={<YourRides />} />
      </Routes>
    </BrowserRouter>
  );
}
