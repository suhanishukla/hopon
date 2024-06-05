import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaArrowRight } from 'react-icons/fa';
import { IoPerson } from "react-icons/io5";
import { FaCrown } from "react-icons/fa6";

function formatDate(dateString) {
  const options = { month: 'long', day: 'numeric' };
  const utcDate = new Date(dateString + 'T00:00:00Z');
  return utcDate.toLocaleDateString('en-US', options);
}

function formatTime(timeString) {
  const [hour, minute] = timeString.split(':');
  let hour12 = parseInt(hour);
  const ampm = hour12 >= 12 ? 'PM' : 'AM';
  hour12 = hour12 % 12 || 12;
  return `${hour12}:${minute} ${ampm}`;
}

export default function RidePopup({ isOpen, onClose, rideId, ridename, startLocation, endLocation, date, time, currentPassengers, totalPassengers, passengerList, additionalInfo, isCreator, isJoined }) {
  const [popupHeight, setPopupHeight] = useState('auto');
  const [error, setError] = useState('');

  useEffect(() => {
    const baseHeight = 380;
    const passengerHeight = 50;
    const additionalInfoHeight = additionalInfo ? 50 : 0; 
    const calculatedHeight = baseHeight + passengerList.length * passengerHeight + additionalInfoHeight;
    const finalHeight = Math.max(calculatedHeight, baseHeight);
    setPopupHeight(finalHeight);
  }, [passengerList, additionalInfo]);

  const handleJoinRide = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to join a ride');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/workouts/joinRide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ rideId }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to join the ride');
        }
        alert('Successfully joined the ride!');
        window.location.reload(); // Reload the page to update the ride info
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const handleDeleteRide = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to delete a ride');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/deleteRide/${rideId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete ride');
      }

      const data = await response.json();
      alert(data.message || 'Successfully deleted the ride!');
      window.location.reload(); // Reload the page to update the ride info
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleLeaveRide = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to leave a ride');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/leaveRide/${rideId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to leave ride');
      }

      const data = await response.json();
      alert(data.message || 'Successfully left the ride!');
      window.location.reload(); // Reload the page to update the ride info
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <Popup
      open={isOpen}
      onClose={onClose}
      modal
      nested
      contentStyle={{
        width: '35%',
        padding: '20px',
        borderRadius: '10px',
        minHeight: '380px',
        height: popupHeight,
        fontFamily: '"Poppins", sans-serif',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        backgroundImage: 'linear-gradient(#00326F , transparent), linear-gradient(to top left, #4F2F98, transparent), linear-gradient(to top right, #10274E, transparent)',
        backgroundBlendMode: 'screen',
        color: 'white',
        position: 'relative',
      }}
    >
      {(close) => (
        <div className="popup" style={{ color: 'white', fontFamily: '"Poppins", sans-serif' }}>
          <div style={{ textAlign: 'left', marginBottom: '15px', fontSize: '24px', fontWeight: 'normal', marginLeft: '0px', padding: '0', fontWeight: '600' }}>
            {ridename}
          </div>
          {additionalInfo && (
            <div style={{ marginBottom: '20px', fontWeight: 'normal', fontSize: '16px' }}>
              {additionalInfo}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ width: '50%', marginRight: '0%', paddingRight: '2%' }}>
              <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
                {startLocation}
              </div>
            </div>
            <FaArrowRight style={{ alignSelf: 'center', fontSize: '24px', marginTop: '6px', marginRight: '0%' }} />
            <div style={{ width: '50%', marginLeft: '0%', paddingLeft: '2%' }}>
              <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
                {endLocation}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ width: '50%', marginRight: '2%' }}>
              <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>Date</div>
              <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
                {formatDate(date)}
              </div>
            </div>
            <div style={{ width: '50%', marginLeft: '2%' }}>
              <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>Time</div>
              <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
                {formatTime(time)}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ width: '50%', marginRight: '2%' }}>
              <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>Total Passengers</div>
              <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
                {totalPassengers}
              </div>
            </div>
            <div style={{ width: '50%', marginLeft: '2%' }}>
              <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>Seats Available</div>
              <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
                {totalPassengers - currentPassengers}
              </div>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>Passengers</div>
            {passengerList.map((passenger, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {passenger.isCreator ? <FaCrown style={{ marginRight: '10px', color: 'gold' }} /> : <IoPerson style={{ marginRight: '10px' }} />}
                <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
                  {passenger.name}
                </div>
              </div>
            ))}
          </div>
          {error && (
            <div style={{ color: 'red', marginBottom: '20px' }}>
              {error}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {isCreator ? (
              <button
                onClick={handleDeleteRide}
                style={{ backgroundColor: '#FF0000', border: 'none', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px 20px', cursor: 'pointer' }}
              >
                Delete Ride
              </button>
            ) : isJoined ? (
              <button
                onClick={handleLeaveRide}
                style={{ backgroundColor: '#FF0000', border: 'none', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px 20px', cursor: 'pointer' }}
              >
                Leave Ride
              </button>
            ) : (
              <button
                onClick={handleJoinRide}
                style={{ backgroundColor: '#0044CC', border: 'none', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px 20px', cursor: 'pointer' }}
              >
                Join Ride
              </button>
            )}
            <button
              onClick={close}
              style={{ backgroundColor: '#CCCCCC', border: 'none', borderRadius: '40px', color: 'black', fontSize: '16px', padding: '10px 20px', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}


// import React, { useState, useEffect } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import { FaArrowRight } from 'react-icons/fa';
// import { IoPerson } from "react-icons/io5";
// import { FaCrown } from "react-icons/fa6";

// function formatDate(dateString) {
//   const options = { month: 'long', day: 'numeric' };
//   const utcDate = new Date(dateString + 'T00:00:00Z');
//   return utcDate.toLocaleDateString('en-US', options);
// }

// function formatTime(timeString) {
//   const [hour, minute] = timeString.split(':');
//   let hour12 = parseInt(hour);
//   const ampm = hour12 >= 12 ? 'PM' : 'AM';
//   hour12 = hour12 % 12 || 12;
//   return `${hour12}:${minute} ${ampm}`;
// }

// export default function RidePopup({ isOpen, onClose, rideId, ridename, startLocation, endLocation, date, time, currentPassengers, totalPassengers, passengerList, additionalInfo }) {
//   const [popupHeight, setPopupHeight] = useState('auto');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const baseHeight = 380;
//     const passengerHeight = 50;
//     const additionalInfoHeight = additionalInfo ? 50 : 0; 
  
//     const calculatedHeight = baseHeight + passengerList.length * passengerHeight + additionalInfoHeight;
  
//     const finalHeight = Math.max(calculatedHeight, baseHeight);
  
//     setPopupHeight(finalHeight);
//   }, [passengerList, additionalInfo]);
  
  

//   const handleJoinRide = async () => {
//     const token = sessionStorage.getItem('token');
//     if (!token) {
//       alert('You must be logged in to join a ride');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/workouts/joinRide', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, 
//         },
//         body: JSON.stringify({ rideId }),
//       });

//       const contentType = response.headers.get('content-type');
//       if (contentType && contentType.indexOf('application/json') !== -1) {
//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data.error || 'Failed to join the ride');
//         }
//         alert('Successfully joined the ride!');
//         window.location.reload(); // Reload the page to update the ride info
//       } else {
//         throw new Error('Unexpected response format');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert(error.message);
//     }
//   };
  

//   return (
//     <Popup
//       open={isOpen}
//       onClose={onClose}
//       modal
//       nested
//       contentStyle={{
//         width: '35%',
//         padding: '20px',
//         borderRadius: '10px',
//         minHeight: '380px', 
//         height: popupHeight,
//         fontFamily: '"Poppins", sans-serif',
//         backgroundColor: 'transparent', 
//         boxShadow: 'none', 
//         backgroundImage: 'linear-gradient(#00326F , transparent), linear-gradient(to top left, #4F2F98, transparent), linear-gradient(to top right, #10274E, transparent)', // Apply the gradient background
//         backgroundBlendMode: 'screen', 
//         color: 'white', 
//         position: 'relative',
//       }}
//     >
//       {(close) => (
//         <div className="popup" style={{ color: 'white', fontFamily: '"Poppins", sans-serif' }}>
//           <div style={{ textAlign: 'left', marginBottom: '15px', fontSize: '24px', fontWeight: 'normal', marginLeft: '0px', padding: '0', fontWeight: '600' }}>
//             {ridename}
//           </div>
//           {additionalInfo && (
//             <div style={{ marginBottom: '20px', fontWeight: 'normal', fontSize: '16px' }}>
//               {additionalInfo}
//             </div>
//           )}
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//             <div style={{ width: '50%', marginRight: '0%', paddingRight: '2%' }}>
//               <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
//                 {startLocation}
//               </div>
//             </div>
//             <FaArrowRight style={{ alignSelf: 'center', fontSize: '24px', marginTop: '6px', marginRight: '0%' }} />
//             <div style={{ width: '50%', marginLeft: '0%', paddingLeft: '2%' }}>
//               <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
//                 {endLocation}
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//             <div style={{ width: '50%', marginRight: '2%' }}>
//               <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>Date</div>
//               <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
//                 {formatDate(date)}
//               </div>
//             </div>
//             <div style={{ width: '50%', marginLeft: '2%' }}>
//               <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>Time</div>
//               <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
//                 {formatTime(time)}
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//             <div style={{ width: '50%', marginRight: '2%' }}>
//               <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>Total Passengers</div>
//               <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
//                 {totalPassengers}
//               </div>
//             </div>
//             <div style={{ width: '50%', marginLeft: '2%' }}>
//               <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>Seats Available</div>
//               <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '40px', color: 'white', fontSize: '16px', padding: '10px', width: '100%', pointerEvents: 'none' }}>
//                 {totalPassengers - currentPassengers}
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
//             {passengerList.map((passenger, index) => (
//               <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//                 {passenger.isCrown && <FaCrown style={{ fontSize: '24px', marginRight: '10px' }} />}
//                 {!passenger.isCrown && <IoPerson style={{ fontSize: '24px', marginRight: '10px' }} />}
//                 <span>{passenger.name}</span>
//               </div>
//             ))}
//           </div>
//           <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
//           <button 
//   onClick={handleJoinRide} 
//   style={{
//     fontSize: '16px', 
//     padding: '10px 20px', 
//     backgroundColor: 'transparent', 
//     border: '2px solid white', 
//     borderRadius: '40px', 
//     color: 'white', 
//     fontFamily: '"Poppins", sans-serif', 
//     fontWeight: '600', 
//     transition: 'background-color 0.3s ease', // Adding transition for smooth color change
//     cursor: 'pointer', // Change cursor to pointer on hover
//   }}
//   // Adding hover effect
//   onMouseOver={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#333'; }}
//   onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'white'; }}
// >
//   Join Ride
// </button>
//           </div>
//         </div>
//       )}
//     </Popup>
//   );
// }




