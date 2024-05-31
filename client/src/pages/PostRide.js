import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { TextField, Button, MenuItem, Typography, Paper } from '@material-ui/core';

const libraries = ['places'];

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  formContainer: {
    flex: 1,
    padding: theme.spacing(2),
    marginTop: '65px',
    alignItems: 'center',
    margin: '30px',
    maxHeight: '570px',
    overflowY: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '10px',
    padding: '20px',
  },
  mapContainer: {
    flex: 2,
    padding: theme.spacing(2),
    margin: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formControl: {
    flex: 1,
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    margin: '20px 0',
  },
  createButton: {
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
  textField: {
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
    marginBottom: theme.spacing(1),
  }
}));

const PostRide = () => {
  const classes = useStyles();
  const [rideName, setRideName] = useState('');
  const [rideDate, setRideDate] = useState('');
  const [rideTime, setRideTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 34.0689, lng: -118.4452 });

  const startRef = useRef(null);
  const endRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyC_rhgLqH2yO_D79XL6UGnCigqB6IrSuL4',
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      const autocompleteStart = new window.google.maps.places.Autocomplete(startRef.current);
      autocompleteStart.addListener('place_changed', () => {
        const place = autocompleteStart.getPlace();
        setStart(place.formatted_address);
      });

      const autocompleteEnd = new window.google.maps.places.Autocomplete(endRef.current);
      autocompleteEnd.addListener('place_changed', () => {
        const place = autocompleteEnd.getPlace();
        setEnd(place.formatted_address);
      });
    }
  }, [isLoaded]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem('token');
    let uniqueID = null;
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id;
        uniqueID = userId;
      } catch (error) {
        console.error("Error parsing JWT token:", error);
      }
    } else {
      console.error("JWT token not found in session storage");
    }

    const rideDetails = { rideName, rideDate, rideTime, passengers, start, end, distance, uniqueID };
    const response = await fetch('http://localhost:4000/api/workouts/rider', {
      method: 'POST',
      body: JSON.stringify(rideDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log("Ride Added");
    } else {
      console.log(json.error);
    }

    if (start && end) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            const distanceInKm = result.routes[0].legs[0].distance.text;
            setDistance(distanceInKm);
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background"> 
      <div className={classes.container}>
        <Paper className={classes.formContainer}>
          <Typography component="h1" variant="h4" className={classes.text}>Post a Ride.</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Ride Name"
              value={rideName}
              onChange={(e) => setRideName(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              label="Date"
              type="date"
              value={rideDate}
              onChange={(e) => setRideDate(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className={classes.formRow}>
              <TextField
                label="Time"
                type="time"
                value={rideTime}
                onChange={(e) => setRideTime(e.target.value)}
                margin="normal"
                variant="outlined"
                className={`${classes.textField} ${classes.formControl}`}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Number of Passengers"
                select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                margin="normal"
                variant="outlined"
                className={`${classes.textField} ${classes.formControl}`}
              >
                {[1, 2, 3, 4, 5, 6].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <TextField
              inputRef={startRef}
              label="Starting Destination"
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              inputRef={endRef}
              label="Ending Destination"
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth className={classes.createButton}>
              Post Ride!
            </Button>
          </form>
        </Paper>
        <div className={classes.mapContainer}>
          <Typography variant="h6" className={classes.text}>Ride Distance: {distance}</Typography>
          <GoogleMap
            mapContainerStyle={{ height: '550px', width: '100%', overflow: 'hidden' }}
            center={mapCenter}
            zoom={14}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default PostRide;

