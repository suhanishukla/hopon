import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function SignUp({ setShowSignUp }) {
  const signUpBoxStyle = {
    width: '300px',
    padding: '20px',
    backgroundColor: '#F0EAD6',
    color: '#3d2814',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    margin: 'auto', /* Center the box horizontally */
    marginTop: '100px', /* Adjust top margin to center vertically */
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

  return (
    <div style={signUpBoxStyle}>
      <button onClick={() => setShowSignUp(false)} style={closeButtonStyle}>
        <FaTimes style={{ fontSize: '20px' }} />
      </button>
      <h2 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: '600' }}>Sign Up</h2>
      {/* Sign-up form */}
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input type="text" placeholder="Name" style={{ marginBottom: '10px', width: '100%' }} />
        <input type="email" placeholder="Email" style={{ marginBottom: '10px', width: '100%' }} />
        <input type="password" placeholder="Password" style={{ marginBottom: '10px', width: '100%' }} />
        <input type="password" placeholder="Confirm Password" style={{ marginBottom: '20px', width: '100%' }} />
        <button style={signUpButtonStyle}>Sign Up</button>
      </form>
    </div>
  );
}
