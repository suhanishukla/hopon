// In YourRides.js
import React, { useEffect, useState } from 'react';
import RideCard from '../components/ridecard';

export default function YourRides() {
  const [rides, setRides] = useState([]);

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
        setRides(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserRides();
  }, []);

  return (
    <div className="background">
      {rides.map((ride, index) => (
        <RideCard 
          key={index}
          ridename={ride.rideName}
          startLocation={ride.start}
          endLocation={ride.end}
          date={ride.createdAt}
          time={ride.rideTime}
          totalPassengers={ride.passengers}
          passengerList={[]}
          additionalInfo="your mom"
        />
      ))}
      {console.log(rides)}
    </div>
  );
}
