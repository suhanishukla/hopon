import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRight } from 'react-icons/fa';
import { IoPerson } from "react-icons/io5";
import { FaCrown } from "react-icons/fa6";

export default function RidePopup({ ridename, startLocation, endLocation, date, time, totalPassengers, passengerList, additionalInfo }) {
  const [popupHeight, setPopupHeight] = useState('auto');

  useEffect(() => {
    const baseHeight = 280;
    const passengerHeight = 50;
    const calculatedHeight = baseHeight + passengerList.length * passengerHeight;

    setPopupHeight(calculatedHeight);
  }, [passengerList]);

  const formatDate = (date) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(date).toLocaleTimeString(undefined, options);
  };

  return (
    <Popup
      trigger={<IoIosArrowForward style={{ fontSize: '24px' }} />}
      modal
      nested
      contentStyle={{
        width: '35%',
        padding: '20px',
        borderRadius: '10px',
        height: popupHeight,
        backgroundColor: 'white',
      }}
    >
      {(close) => (
        <div className="popup">
          <div style={{ textAlign: 'left', marginBottom: '15px', fontSize: '24px', fontWeight: 'bold', color: '#0x3d2814', marginLeft: '0px', padding: '0', fontFamily: '"Poppins", sans-serif', fontWeight: '600' }}>
            {ridename}
          </div>
          {additionalInfo && (
            <div style={{ marginBottom: '20px', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal', color: '#3d2814', fontSize: '16px' }}>
              {additionalInfo}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ width: '50%', marginRight: '0%', paddingRight: '2%' }}>
              <div style={{ backgroundColor: '#F0EAD6', color: '#3d2814', padding: '10px', borderRadius: '5px', fontFamily: '"Poppins", sans-serif', fontWeight: 'bold' }}>
                {startLocation}
              </div>
            </div>
            <FaArrowRight style={{ alignSelf: 'center', fontSize: '24px', color: '#3d2814', marginTop: '6px', marginRight: '0%' }} />
            <div style={{ width: '50%', marginLeft: '0%', paddingLeft: '2%' }}>
              <div style={{ backgroundColor: '#F0EAD6', color: '#3d2814', padding: '10px', borderRadius: '5px', fontFamily: '"Poppins", sans-serif', fontWeight: 'bold' }}>
                {endLocation}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ width: '50%', marginRight: '2%', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>
              <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>date</div>
              <div style={{ backgroundColor: '#F0EAD6', color: '#3d2814', padding: '10px', borderRadius: '5px', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>
                {formatDate(date)}
              </div>
            </div>
            <div style={{ width: '50%', marginLeft: '2%', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>
              <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>time</div>
              <div style={{ backgroundColor: '#F0EAD6', color: '#3d2814', padding: '10px', borderRadius: '5px', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>
                {formatTime(time)}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ width: '50%', marginRight: '2%', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>
              <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>total passengers</div>
              <div style={{ backgroundColor: '#F0EAD6', color: '#3d2814', padding: '10px', borderRadius: '5px', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>
                {totalPassengers}
              </div>
            </div>
            <div style={{ width: '50%', marginLeft: '2%', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>
              <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>seats available</div>
              <div style={{ backgroundColor: '#F0EAD6', color: '#3d2814', padding: '10px', borderRadius: '5px', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>
                {totalPassengers - passengerList.length}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            {passengerList.map((passenger, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {passenger.isCrown && <FaCrown style={{ fontSize: '24px', marginRight: '10px', color: '#3d2814' }} />}
                {!passenger.isCrown && <IoPerson style={{ fontSize: '24px', marginRight: '10px', color: '#3d2814' }} />}
                <span style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 'normal', color: '#3d2814', fontSize: '16px' }}>{passenger.name}</span>
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
            <button onClick={close} style={{ fontSize: '16px', padding: '10px 20px', backgroundColor: '#3d2814', color: 'white', fontFamily: '"Poppins", sans-serif', fontWeight: '600', borderRadius: '10px', border: 'none' }}>join ride</button>
          </div>
        </div>
      )}
    </Popup>
  );
}
