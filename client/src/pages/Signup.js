import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

export default function SignUp({ setShowSignUp }) {
  const [formData, setFormData] = useState({
    first_name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const signUpBoxStyle = {
    width: '300px',
    padding: '20px',
    backgroundColor: '#F0EAD6',
    color: '#3d2814',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    margin: 'auto', // Center the box horizontally
    marginTop: '100px', // Adjust top margin to center vertically
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };

  const signUpButtonStyle = {
    backgroundColor: '#3d2814',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: '600',
    width: '100%',
    marginTop: '20px',
    cursor: 'pointer',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/workouts/signup', {
        first_name,
        username,
        password,
      });

      if (response.status === 200) {
        setMessage('Signup successful!');
      } else {
        setMessage(`Signup failed: ${response.data.message}`);
      }
    } catch (error) {
      setMessage(`Signup failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={signUpBoxStyle}>
      <button onClick={() => setShowSignUp(false)} style={closeButtonStyle}>
        <FaTimes style={{ fontSize: '20px' }} />
      </button>
      <h2 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: '600' }}>
        Sign Up
      </h2>
      {/* Sign-up form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <input
          type="email"
          placeholder="Email"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <button type="submit" style={signUpButtonStyle}>
          Sign Up
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}