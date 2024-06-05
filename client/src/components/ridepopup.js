import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaArrowRight } from 'react-icons/fa';
import { IoPerson } from "react-icons/io5";
import { FaCrown } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";

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

export default function RidePopup({ isOpen, onClose, ridename, startLocation, endLocation, date, time, totalPassengers, passengerList, additionalInfo }) {
  const [popupHeight, setPopupHeight] = useState('auto');

  useEffect(() => {
    const baseHeight = 380;
    const passengerHeight = 50;
    const additionalInfoHeight = additionalInfo ? 50 : 0; 
  
    const calculatedHeight = baseHeight + passengerList.length * passengerHeight + additionalInfoHeight;
  
    const finalHeight = Math.max(calculatedHeight, baseHeight);
  
    setPopupHeight(finalHeight);
  }, [passengerList, additionalInfo]);
  
  

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
        backgroundImage: 'linear-gradient(#00326F , transparent), linear-gradient(to top left, #4F2F98, transparent), linear-gradient(to top right, #10274E, transparent)', // Apply the gradient background
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
                {totalPassengers - passengerList.length}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}> {}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {passengerList.map((passenger, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {passenger.isCrown && <FaCrown style={{ fontSize: '24px', marginRight: '10px' }} />}
                  {!passenger.isCrown && <IoPerson style={{ fontSize: '24px', marginRight: '10px' }} />}
                  <span>{passenger.name}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'right' }}> {}
            <button
                style={{
                  display: 'inline-block',
      verticalAlign: 'middle',
                  fontSize: '20px',
                  padding: '5px 10px',
                  paddingTop: '10px',
                  backgroundColor: 'transparent',
                  border: '2px solid white',
                  borderRadius: '40px',
                  color: 'white',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: '600',
                  transition: 'background-color 0.3s ease', 
                  cursor: 'pointer',
                  marginRight: '4%',
                }}
                onMouseOver={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#333'; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'white'; }}
              >
                <MdOutlineMailOutline />
              </button>
              <button
                onClick={onClose}
                style={{
                  display: 'inline-block',
      verticalAlign: 'middle',
                  fontSize: '16px',
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  border: '2px solid white',
                  borderRadius: '40px',
                  color: 'white',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: '600',
                  transition: 'background-color 0.3s ease', 
                  cursor: 'pointer', 
                }}
                onMouseOver={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#333'; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'white'; }}
              >
                Join Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}




