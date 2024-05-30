import React from 'react';
import { Box, Card, CardActions, CardContent, Typography, IconButton } from '@material-ui/core';
import { IoMdPerson } from "react-icons/io";
import { FaClock, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import RidePopup from '../components/ridepopup';
import { RxDot } from "react-icons/rx";

export default function RideCard({ ridename, startLocation, endLocation, date, time, totalPassengers, passengerList, additionalInfo }) {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    />
  );

  const items1 = [
    { name: ridename, spacing: '20px', fontSize: '30px' },
    { name: <><IoMdPerson /> {totalPassengers}</>, spacing: '10px', fontSize: '15px' },
    { name: <><FaCalendarAlt /> {formatDate(date)}</>, spacing: '15px', fontSize: '15px' },
    { name: <><FaClock /> {formatTime(time)}</>, spacing: '15px', fontSize: '15px' }
  ];

  function formatDate(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    return formattedDate;
  }

  function formatTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  }

  return (
    <Box sx={{ minWidth: 275, padding: '20px' }}>
      <Card variant="outlined" style={{ borderWidth: '2px', borderColor: '#3d2814', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <CardContent className="cardContent" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {items1.map((item, index) => (
              <span key={index} style={{ marginRight: item.spacing, fontSize: item.fontSize }} >
                {item.name}
                {index !== items1.length - 1 && bull}
              </span>
            ))}
            <Typography sx={{ mb: 0.5, mt: 2 }} color="#3d2814">
              <RxDot /> {startLocation}
              <br />
              <RxDot /> {endLocation}
            </Typography>
          </div>
          <div>
            <CardActions sx={{ justifyContent: 'flex-end', mt: 4 }}>
              <IconButton>
                <RidePopup
                  ridename={ridename}
                  startLocation={startLocation}
                  endLocation={endLocation}
                  date={date}
                  time={time}
                  totalPassengers={totalPassengers}
                  passengerList={passengerList}
                  additionalInfo={additionalInfo}
                />
              </IconButton>
            </CardActions>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
