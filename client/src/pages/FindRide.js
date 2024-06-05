import React, { useEffect, useState, useRef } from 'react';
import RideCard from '../components/ridecard';
import { useJsApiLoader } from '@react-google-maps/api';
import { TextField, Button, Paper, Typography, makeStyles } from '@material-ui/core';

const libraries = ['places'];

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    marginTop: '0px',
    margin: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderRadius: '10px',
    padding: '20px',
  },
  searchContainer: {
    flex: 1,
    padding: theme.spacing(2),
    // marginTop: '65px',
    alignItems: 'center',
    margin: '30px',
    maxHeight: '570px',
    overflowY: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    padding: '20px',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
    maxHeight: '670px',
    overflowY: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      borderRadius: '40px',
      '& fieldset': {
        borderColor: 'white',
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      '& .MuiOutlinedInput-input': {
        color: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white',
    },
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
  },
  searchButton: {
    backgroundColor: '#111111',
    color: 'white',
    padding: '10px',
    borderRadius: '23px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: '600',
    width: '100%',
    marginTop: '20px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#142847',
    },
  },
}));

export default function FindRide() {
  const classes = useStyles();
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [rideTime, setRideTime] = useState('');

  const startRef = useRef(null);
  const endRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyC_rhgLqH2yO_D79XL6UGnCigqB6IrSuL4',
    libraries,
  });

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/workouts/getRide");
        if (!response.ok) {
          throw new Error("Failed to fetch rides");
        }
        const json = await response.json();
        const availableRides = json.filter(ride => ride.currentPassengers < ride.passengers);
        setRides(availableRides);
        setFilteredRides(availableRides);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRides();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const autocompleteStart = new window.google.maps.places.Autocomplete(startRef.current);
      autocompleteStart.addListener('place_changed', () => {
        const place = autocompleteStart.getPlace();
        setStartLocation(place.formatted_address);
      });

      const autocompleteEnd = new window.google.maps.places.Autocomplete(endRef.current);
      autocompleteEnd.addListener('place_changed', () => {
        const place = autocompleteEnd.getPlace();
        setEndLocation(place.formatted_address);
      });
    }
  }, [isLoaded]);

  const handleSearch = async () => {
    const filtered = [];
    for (const ride of rides) {
      const startWithinFiveMiles = await isWithinFiveMiles(ride.start, startLocation);
      const endWithinFiveMiles = await isWithinFiveMiles(ride.end, endLocation);
      if (startWithinFiveMiles && endWithinFiveMiles && isWithinTimeRange(ride.rideTime, rideTime) && (ride.currentPassengers < ride.passengers)) {
        filtered.push(ride);
      }
    }
    setFilteredRides(filtered);
  };

  const isWithinFiveMiles = (location1, location2) => {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [location1],
          destinations: [location2],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === window.google.maps.DistanceMatrixStatus.OK) {
            const distanceInMeters = response.rows[0].elements[0].distance.value;
            const distanceInMiles = distanceInMeters / 1609.34;
            resolve(distanceInMiles <= 5);
          } else {
            reject(new Error('Error fetching distance matrix'));
          }
        }
      );
    });
  };

  const isWithinTimeRange = (rideTime, selectedTime) => {
    const rideDateTime = new Date(`1970-01-01T${rideTime}`);
    const selectedDateTime = new Date(`1970-01-01T${selectedTime}`);
    const timeDifference = Math.abs(rideDateTime - selectedDateTime);
    return timeDifference <= 30 * 60 * 1000; // 30 minutes in milliseconds
  };

  return (
    <div className="background">
      <Paper className={classes.container}>
      <div className={classes.searchContainer}>
        <Typography component="h1" variant="h4" className={classes.text}>Find a Ride</Typography>
        <form className={classes.form} onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <TextField
            inputRef={startRef}
            label="Starting Location"
            variant="outlined"
            className={classes.textField}
            fullWidth
          />
          <TextField
            inputRef={endRef}
            label="Ending Location"
            variant="outlined"
            className={classes.textField}
            fullWidth
          />
          <TextField
            type="time"
            label="Time"
            value={rideTime}
            onChange={(e) => setRideTime(e.target.value)}
            variant="outlined"
            className={classes.textField}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" className={classes.searchButton}>
            Search
          </Button>
        </form>
        </div>
        <div className={classes.resultsContainer}>
          {filteredRides.map((ride, index) => (
            <RideCard 
              key={index}
              rideId={ride._id}
              ridename={ride.rideName}
              startLocation={ride.start}
              endLocation={ride.end}
              date={ride.rideDate}
              time={ride.rideTime}
              currentPassengers={ride.currentPassengers}
              totalPassengers={ride.passengers}
              passengerList={[]}
              additionalInfo={ride.additionalInfo}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
}
