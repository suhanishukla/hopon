import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { FaClock, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import RidePopup from './ridepopup';
import { IoMdPerson } from "react-icons/io";
import { RxDot } from "react-icons/rx";

export default function RideCard({ ridename, startLocation, endLocation, date, time, totalPassengers, passengerList, additionalInfo }) {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    />
  );

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

  const [popupOpen, setPopupOpen] = useState(false);

  const handleCardClick = () => {
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const items1 = [
    { name: ridename, spacing: '20px', fontSize: '30px' },
    { name: <><FaCalendarAlt /> {formatDate(date)}</>, spacing: '15px', fontSize: '15px' },
    { name: <><FaClock /> {formatTime(time)}</>, spacing: '15px', fontSize: '15px' },
    { name: <><IoMdPerson /> {totalPassengers}</>, spacing: '10px', fontSize: '15px' }
  ];

  return (
    <Box sx={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <Card 
        variant="outlined" 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          borderRadius: '10px',
          transition: 'transform 0.3s, opacity 0.3s',
          '&:hover': {
            transform: 'scale(1.03)',
            opacity: 0.9
          }
        }}
        onClick={handleCardClick}
      >
        <CardContent className="cardContent" sx={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
          <div>
            {items1.map((item, index) => (
              <span key={index} style={{ marginRight: item.spacing, fontSize: item.fontSize, fontFamily: 'Poppins, sans-serif' }} >
                {item.name}
                {index !== items1.length - 1 && bull}
              </span>
            ))}
            <Typography sx={{ mb: 0.5, mt: 2, fontFamily: 'Poppins, sans-serif' }} color="white">
              <RxDot /> {startLocation}
              <br />
              <RxDot /> {endLocation}
            </Typography>
          </div>
          <div>
            <CardActions sx={{ justifyContent: 'flex-end', mt: 4 }}>
              <IconButton>
                {popupOpen && (
                  <RidePopup
                    isOpen={popupOpen}
                    onClose={handleClose}
                    ridename={ridename}
                    startLocation={startLocation}
                    endLocation={endLocation}
                    date={date}
                    time={time}
                    totalPassengers={totalPassengers}
                    passengerList={passengerList}
                    additionalInfo={additionalInfo}
                  />
                )}
              </IconButton>
            </CardActions>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}