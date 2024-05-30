import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { IoMdPerson } from "react-icons/io";
import { FaClock, FaArrowRight } from "react-icons/fa";
import RidePopup from './ridepopup';
import { RxDot } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";

const items1 = [
  { name: 'pity party on wheels', spacing: '20px', fontSize: '30px' },
  { name: <><IoMdPerson /> 4</>, spacing: '10px', fontSize: '15px' },
  { name: <><FaClock /> 4:30 PM</>, spacing: '15px', fontSize: '15px' }
];

export default function RideCard() {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ borderWidth: '2px', borderColor: '#3d2814' }}>
        <CardContent className="cardContent" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {items1.map((item, index) => (
              <span key={index} style={{ marginRight: item.spacing, fontSize: item.fontSize }} >
                {item.name}
                {index !== items1.length - 1 && bull}
              </span>
            ))}
            <Typography sx={{ mb: 0.5, mt: 2 }} color="#3d2814">
              <RxDot /> UCLA
              <br/>
              <RxDot /> USC
            </Typography>
          </div>
          <div>
            <CardActions sx={{ justifyContent: 'flex-end', mt: 4 }}>
              {/* Use RidePopup component here */}
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
            </CardActions>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}