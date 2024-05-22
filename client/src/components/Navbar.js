import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">HopOn</Link>
      </div>
      <div className="nav-right">
        <Link to="/Find a Ride">Find a Ride</Link>
        <Link to="/Post a Ride">Post a Ride</Link>
        <Link to="/LogIn">Log in</Link>
      </div>
    </nav>
  );
}
