import React from 'react';
import RideCard from '../components/RideCard';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  paddingTop: '50px', // Adjust the padding top to position the box higher
  backgroundColor: '#F0EAD6', // Blueish background color
  width: '100%', // Make the container take up the whole width
};

const yourRidesStyle = {
  fontFamily: '"Poppins", sans-serif', // Apply font family
  width: '100%', // Make the content take up the whole width
};

const ridesHeadingStyle = {
  marginLeft: '20px', // Adjust the left margin
  width: '100%', // Make the heading take up the whole width
};

const upcomingRides = [
  { ridename: "Carpool to USC", startLocation: "UCLA", endLocation: "USC", date: "2024-05-15", time: "2024-05-15T10:00:00", totalPassengers: 4, passengerList: [], additionalInfo: "We will be meeting at the parking lot and I will drive us. It will be $20 per person!" },
  // Add more upcoming rides as needed
];

const pastRides = [
  // Add past rides data similarly
];

export default function FindRide() {
  return (
    <div className="background" style={containerStyle}> 
      <div style={yourRidesStyle}>
        <h2 style={ridesHeadingStyle}>Upcoming Rides</h2>
        {upcomingRides.map((ride, index) => (
          <RideCard key={index} {...ride} />
        ))}
        
        <h2 style={ridesHeadingStyle}>Past Rides</h2>
        {pastRides.map((ride, index) => (
          <RideCard key={index} {...ride} />
        ))}
      </div>
    </div>
  );
}
