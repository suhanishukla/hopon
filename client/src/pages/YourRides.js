import React from 'react';
import RidePopup from '../components/ridepopup';
import RideCard from '../components/RideCard';

export default function FindRide() {
  const yourRidesStyle = {
    fontFamily: '"Poppins", sans-serif', // Apply font family
  };

  const ridesHeadingStyle = {
    marginLeft: '20px', // Adjust the left margin
  };

  return (
    <div style={yourRidesStyle}>
      <h2 style={ridesHeadingStyle}>Upcoming Rides</h2>
      <RidePopup
               ridename="Carpool to USC"
               startLocation="UCLA"
               endLocation="USC"
               date="2024-05-15"
               time="2024-05-15T10:00:00"
               totalPassengers={4}
               passengerList={[
                   { name: "Passenger #1", isCrown: true },
                   { name: "Passenger #2", isCrown: false },
                   { name: "Passenger #3", isCrown: false }
               ]}
               additionalInfo="We will be meeting at the parking lot and I will drive us. It will be $20 per person!"
           />
      <RideCard />
      <RideCard />
      {/* Add more upcoming ride cards as needed */}
      
      <h2 style={ridesHeadingStyle}>Past Rides</h2>
      <RideCard />
      <RideCard />
      <RideCard />
      {/* Add more past ride cards as needed */}
    </div>
  );
}