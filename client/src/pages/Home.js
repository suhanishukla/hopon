import React from 'react';
import '../styles.css'; 
import myImage from '../images/uberimage.png'
import carImage from '../images/car.png'
import carGif from '../images/cardrive.gif'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className='box'>
        <h1 className='custom-h1'>Get anywhere</h1>
        <h1 className='h1-2'>in seconds</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className='start-container'>
            <Link to="/LogIn" className='start'>Get Started</Link>
            <div class="gif-container">
              <img src={carGif}></img>
            </div>
          </div>
          {/* <div class="gif-container">
            <img src={carGif}></img>
          </div> */}
        </div>
        <hr />
      </div>
      <div className='box'>
        <img src={myImage} className='home-image'></img>
      </div>
      
    </div>
  );
};

export default Home;