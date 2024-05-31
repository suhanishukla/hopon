import React from 'react';
import RidePopup from '../components/ridepopup';
import RideCard from '../components/RideCard';

export default function FindRide() {
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
    </div>
  );
}
