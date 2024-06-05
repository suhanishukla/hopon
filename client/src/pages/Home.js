import React from 'react';
import '../styles.css'; 
import myImage from '../images/uberimage.png'
import carImage from '../images/car.png'
import carGif from '../images/cardrive.gif'
import { Link, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className='box'>
        <div className='typed-text'>
          <Typewriter options={{
            autoStart: true,
            loop: true,
            delay: 50, 
          }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Book your ride in seconds...")
                .pauseFor(1500)
                .deleteAll()
                .typeString("Affordable rides, anytime...")
                .pauseFor(1500)
                .deleteAll()
                .typeString("Share your journey...")
                .pauseFor(1500)
                .deleteAll()
                .typeString("Explore new destinations...")
                .pauseFor(1500)
                .deleteAll()
                .typeString("Ride in comfort...")
                .pauseFor(1500)
                .deleteAll()
                .typeString("Post a ride...")
                .pauseFor(1500)
                .deleteAll()
                .typeString("Effortlessly book a ride...")
                .pauseFor(1500)
                .deleteAll()
                .typeString("Hop in and ride on")
                .pauseFor(1500)
                .deleteAll()
                .start();
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className='start-container'>
            <Link to="/Find%20a%20Ride" className='start'>Get Started</Link>
            <div class="gif-container">
              <img src={carGif}></img>
            </div>
          </div>
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