import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import carImage from '../images/car.png'

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/LogIn');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isAuthenticated = !!sessionStorage.getItem('token');

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/"> HopOn
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/Find a Ride">Find a Ride</Link>
        <Link to="/Post a Ride">Post a Ride</Link>
        {isAuthenticated ? (
          <div className="profile-menu" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <button className="profile-button">My Profile</button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <Link to="/your-rides">Your Rides</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/LogIn">Log in</Link>
        )}
      </div>
    </nav>
  );
}
