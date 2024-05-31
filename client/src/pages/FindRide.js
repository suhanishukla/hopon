import React, { useEffect, useState } from 'react';
import RidePopup from '../components/ridepopup';
import RideCard from '../components/RideCard';

export default function FindRide() {
  const [rides, setRides] = useState([]); // Initial state as an empty array
  const [indiRide, setRide] = useState(null); // Initial state as null

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/workouts/getRide");
        if (!response.ok) {
          throw new Error("Failed to fetch rides");
        }
        const json = await response.json(); // Call the function to parse JSON
        setRides(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRides();
  }, []);

  const rideData = {
    ridename: "carpool to USC",
    startLocation: "UCLA",
    endLocation: "USC",
    date: "2024-06-17",
    time: "10:00:00",
    totalPassengers: 5,
    passengerList: [
      { name: "passenger #1", isCrown: true },
      { name: "passenger #2", isCrown: false },
      { name: "passenger #3", isCrown: false }
    ],
    additionalInfo: "We will be meeting at the parking lot and I will drive us. It will be $20 per person!"
  };

  return (
    <div className="background">
      <RideCard {...rideData} />
      {rides.map((ride, index) => (
        <RideCard 
          key={index}
          ridename={ride.rideName}
          startLocation={ride.start}
          endLocation={ride.end}
          date="hi" // Proper interpolation
          time={ride.rideTime}
          totalPassengers={ride.passengers}
          passengerList={[]}
          additionalInfo="your mom"
        />
        // <p>{index}</p>
      ))}
      {console.log(rides)}
    </div>
  );
}
