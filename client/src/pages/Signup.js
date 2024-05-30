import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

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
    // <div style={signUpBoxStyle}>
    //   <button onClick={() => setShowSignUp(false)} style={closeButtonStyle}>
    //     <FaTimes style={{ fontSize: '20px' }} />
    //   </button>
    //   <h2 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: '600' }}>
    //     Sign Up
    //   </h2>
    //   {/* Sign-up form */}
    //   <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    //     <input
    //       type="text"
    //       placeholder="Name"
    //       name="first_name"
    //       value={formData.first_name}
    //       onChange={handleInputChange}
    //       style={{ marginBottom: '10px', width: '100%' }}
    //     />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       name="username"
    //       value={formData.username}
    //       onChange={handleInputChange}
    //       style={{ marginBottom: '10px', width: '100%' }}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleInputChange}
    //       style={{ marginBottom: '10px', width: '100%' }}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Confirm Password"
    //       name="confirmPassword"
    //       value={formData.confirmPassword}
    //       onChange={handleInputChange}
    //       style={{ marginBottom: '20px', width: '100%' }}
    //     />
    //     <button type="submit" style={signUpButtonStyle}>
    //       Sign Up
    //     </button>
    //   </form>
    //   {message && <p>{message}</p>}
    // </div>
    <div className="background">
          <Container component="main" >
					<div style={{ color: '#142847' }}> . </div><CssBaseline />
					<Box
						sx={{
						marginTop: 3,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						backgroundColor: 'rgba(255, 255, 255, 0.3)', // Black color with 50% opacity
						padding: '40px',
						borderRadius: '10px',
						width: '500px',  // Set the width to 100%
						height: '100%', // Set the height to 100%
						// minWidth: '500px', // Minimum height for the box
						}}
					>
					<Typography component="h1" variant="h4" sx={{ color: 'white', fontWeight: 'bold', alignSelf: 'flex-start' }}>
                        Sign up
          </Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
							margin="normal"
							required
							fullWidth
							id="name"
							label="Name"
							autoComplete="name"
							name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
							autoFocus
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
							id="email"
							label="email address"
							autoComplete="email"
							name="username"
          value={formData.username}
          onChange={handleInputChange}
							autoFocus
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
							label="password"
							type="password"
							id="password"
							autoComplete="current-password"
							          name="password"
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
            <TextField
							margin="normal"
							required
							fullWidth
							label="confirm password"
							type="password"
							id="password"
							autoComplete="current-password"
							          name="password"
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
							sx={{ mt: 3, mb: 2, borderRadius: '40px', backgroundColor: 'black' }}
						>
							Sign up
						</Button>
						<Divider sx={{ borderColor: 'white' }}>
						<Typography variant="body2" sx={{ fontSize: '15px' }}>or</Typography>
						</Divider>
						{/* <Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ 
								mt: 3, 
								mb: 2, 
								borderRadius: '40px', 
								backgroundColor: 'transparent', 
								textTransform: 'lowercase',
								border: '2px solid white', // Added border property
								color: 'white' // Ensure text color is white
							}}
							onClick={signInWithGoogle}
						>
							Sign up with Google
						</Button> */}
                        <Link
                            href="#"
                            variant="body2"
                            sx={{
                                display: 'block',
                                color: 'white',
                                textAlign: 'center',
                                marginTop: 2 // Optional: Add some margin to the top if needed
                            }}
                            >
                            {"Already have an account? Sign in"}
                        </Link>
						</Box>
					</Box>
					</Container>
            </div>
  );
}