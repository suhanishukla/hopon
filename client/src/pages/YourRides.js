import React, { useEffect, useState } from 'react';
import RideCard from '../components/RideCard';

export default function YourRides() {
  const [postedRides, setPostedRides] = useState([]);
  const [joinedRides, setJoinedRides] = useState([]);

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

    fetchUserRides();
    fetchJoinedRides();
  }, []);

  return (
    <div className="background">
      <h2>Posted Rides</h2>
      {postedRides.map((ride, index) => (
        <RideCard 
          key={index}
          rideId={ride._id}
          ridename={ride.rideName}
          startLocation={ride.start}
          endLocation={ride.end}
          date={ride.createdAt}
          time={ride.rideTime}
          currentPassengers={ride.currentPassengers}
          totalPassengers={ride.passengers}
          passengerList={[]}
          additionalInfo="your mom"
        />
      ))}
      {console.log(postedRides)}

      <h2>Joined Rides</h2>
      {joinedRides.map((ride, index) => (
        <RideCard 
          key={index}
          rideId={ride._id}
          ridename={ride.rideName}
          startLocation={ride.start}
          endLocation={ride.end}
          date={ride.createdAt}
          time={ride.rideTime}
          currentPassengers={ride.currentPassengers}
          totalPassengers={ride.passengers}
          passengerList={[]}
          additionalInfo="your mom"
        />
      ))}
      {console.log(joinedRides)}
    </div>
  );
}


