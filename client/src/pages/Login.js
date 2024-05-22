import React from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  paddingTop: '50px', // Adjust the padding top to position the box higher
};

const loginBoxStyle = {
  width: '300px',
  padding: '20px',
  backgroundColor: '#F0EAD6',
  color: '#3d2814',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
};

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/Signup');
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: '600' }}>Log in</h2>
        {/* Login form */}
        <input type="text" placeholder="Name" style={{ marginBottom: '10px', width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        <input type="password" placeholder="Password" style={{ marginBottom: '20px', width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        {/* Log in button */}
        <div style={{ textAlign: 'center' }}>
          <button style={{ backgroundColor: '#3d2814', color: 'white', padding: '10px', borderRadius: '5px', fontFamily: '"Poppins", sans-serif', fontWeight: '600', border: 'none', cursor: 'pointer' }}>Log in</button>
        </div>
        {/* Sign up link */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: '600', fontSize: '14px' }}>
          New to HopOn? <span style={{ color: '#3d2814', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleSignUpClick}>Sign Up Now!</span>
        </div>
      </div>
    </div>
  );
}
