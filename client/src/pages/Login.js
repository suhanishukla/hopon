// 

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles.css'; 
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


const horizontalLine = {
  display: 'block',
  width: '100%',
  height: '1px',
}

export default function LogIn() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

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
        const { token } = response.data;
        sessionStorage.setItem('token', token);
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
        <div className="background">
          <Container>
          <div style={{ color: '#142847' }}> . </div>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.3)', // White color with 30% opacity
                padding: '20px',
                borderRadius: '10px',
                width: '500px', // Set the width to 500px
              }}
            >
              <Typography component="h1" variant="h4" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Welcome back.<br />
                Sign in to your account
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.username}
                  onChange={handleInputChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '40px',
                      '& fieldset': {
                        borderColor: 'white',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'white',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'white',
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '40px',
                      '& fieldset': {
                        borderColor: 'white',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'white',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'white',
                    },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, borderRadius: '40px', backgroundColor: 'black', color: 'white' }}
                >
                  Sign In
                </Button>
                <Divider sx={{ borderColor: 'white' }}>
                  <Typography variant="body2" sx={{ fontSize: '15px', color: 'white' }}>or</Typography>
                </Divider>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: '40px',
                    backgroundColor: 'transparent',
                    textTransform: 'lowercase',
                    border: '2px solid white',
                    color: 'white',
                  }}
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </Button>
              </Box>
              {message && <Typography sx={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{message}</Typography>}
            </Box>
          </Container>
        </div>
      );
    };
    
    