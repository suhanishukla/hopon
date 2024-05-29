import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await axios.post('http://localhost:4000/api/workouts/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage('Login successful!');
        navigate('/');
      } else {
        setMessage(`Login failed: ${response.data.message}`);
      }
    } catch (error) {
      setMessage(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: '600' }}>Log in</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="Email"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={{ marginBottom: '10px', width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{ marginBottom: '20px', width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ backgroundColor: '#3d2814', color: 'white', padding: '10px', borderRadius: '5px', fontFamily: '"Poppins", sans-serif', fontWeight: '600', border: 'none', cursor: 'pointer' }}>Log in</button>
          </div>
        </form>
        {message && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{message}</p>}
        <div style={{ marginTop: '20px', textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: '600', fontSize: '14px' }}>
          New to HopOn? <span style={{ color: '#3d2814', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleSignUpClick}>Sign Up Now!</span>
        </div>
      </div>
    </div>
  );
}
