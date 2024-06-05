import React, { useEffect, useState } from 'react';
import RideCard from '../components/ridecard';
import { Typography } from '@mui/material';
import jwt from 'jsonwebtoken';

export default function YourRides() {
  const [postedRides, setPostedRides] = useState([]);
  const [joinedRides, setJoinedRides] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserRides = async () => {
      const token = sessionStorage.getItem('token');

      try {
        const response = await fetch("http://localhost:4000/api/workouts/userRides", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user rides");
        }

        const json = await response.json();
        setPostedRides(json);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchJoinedRides = async () => {
      const token = sessionStorage.getItem('token');

      try {
        const response = await fetch("http://localhost:4000/api/workouts/joinedRides", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch joined rides");
        }

        const json = await response.json();
        setJoinedRides(json);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserId = () => {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwt.decode(token);
      setUserId(decodedToken.id);
    };

    fetchUserRides();
    fetchJoinedRides();
    fetchUserId();
  }, []);
  
  const columnMain = {
    width: '45%',
  };

  const columnStyle = {
    width: '100%',
    maxHeight: '670px',
    overflowY: 'auto',
    // marginTop: '20px',
  };

  const stickyTextStyle = {
    position: 'sticky',
    top: '0',
    zIndex: '1',
    fontWeight: 'bold',
    padding: '10px 20px',
  };

  return (
    <div className='background'> 
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div style={columnMain}>
      <Typography style={stickyTextStyle} component="h1" variant="h4"> Posted Rides </Typography>
        <div style={columnStyle}>
          
          {postedRides.map((ride, index) => (
            <RideCard 
              key={index}
              rideId={ride._id}
              ridename={ride.rideName}
              startLocation={ride.start}
              endLocation={ride.end}
              date={ride.rideDate}
              time={ride.rideTime}
              currentPassengers={ride.currentPassengers}
              totalPassengers={ride.passengers}
              passengerList={[]}
              additionalInfo="your mom"
            />
          ))}
        </div>
      </div>

        <div style={columnMain}>
          <Typography style={stickyTextStyle} component="h1" variant="h4"> Joined Rides </Typography>
          <div style={columnStyle}> 
          {joinedRides.map((ride, index) => (
            <RideCard 
              key={index}
              rideId={ride._id}
              ridename={ride.rideName}
              startLocation={ride.start}
              endLocation={ride.end}
              date={ride.rideDate}
              time={ride.rideTime}
              currentPassengers={ride.currentPassengers}
              totalPassengers={ride.passengers}
              passengerList={[]}
              additionalInfo="your mom"
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}