import React from 'react';
import RidePopup from './../components/ridepopup';

export default function FindRide() {
  return (
    <div>
      <p>Find a ride...</p>
      <p>Use our service to find the best rides available in your area.</p>
      <p>Search, compare, and book rides easily with just a few clicks.</p>
      <p>Enjoy your journey with our trusted and verified drivers.</p>
      <RidePopup
               ridename="carpool to usc"
               startLocation="UCLA"
               endLocation="USC"
               date="2024-05-15"
               time="2024-05-15T10:00:00"
               totalPassengers={4}
               passengerList={[
                   { name: "passenger #1", isCrown: true },
                   { name: "passenger #2", isCrown: false },
                   { name: "passenger #3", isCrown: false }
               ]}
               additionalInfo="We will be meeting at the parking lot and I will drive us. It will be $20 per person!"
           />

    </div>
  );
}
