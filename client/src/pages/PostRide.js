import React, { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { TextField, Button, MenuItem, Typography, Paper } from '@material-ui/core';
import useStyles from '../styles';

const libraries = ['places'];

const PostRide = () => {
  const classes = useStyles();
  const [rideName, setRideName] = useState('');
  const [rideTime, setRideTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');

  const startRef = useRef(null);
  const endRef = useRef(null);

  // Loads in the Google Maps API and the additional places library for autofill
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyC_rhgLqH2yO_D79XL6UGnCigqB6IrSuL4',
    libraries,
  });

  useEffect(() => {
    // Checks to make sure that the API is fully loaded in
    if (isLoaded) {
      // Initialize the autocomplete functionality using the google maps autocomplete constructor in the starting reference
      const autocompleteStart = new window.google.maps.places.Autocomplete(startRef.current);
      // Checks for when the user clicks on one of the places and sets the complete start address
      autocompleteStart.addListener('place_changed', () => {
        const place = autocompleteStart.getPlace();
        setStart(place.formatted_address);
      });

      // Initialize the autocomplete functionality using the google maps autocomplete constructor in the ending reference
      const autocompleteEnd = new window.google.maps.places.Autocomplete(endRef.current);
      // Checks for when the user clicks on one of the places and sets the complete end address
      autocompleteEnd.addListener('place_changed', () => {
        const place = autocompleteEnd.getPlace();
        setEnd(place.formatted_address);
      });
    }
  }, [isLoaded]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem('token');
    let uniqueID = null
    if (token) {
      try {
          // Parse the JWT token
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          
          // Access the information from the token
          console.log(decodedToken);
          
          // Example: Accessing user ID
          const userId = decodedToken.id;
          uniqueID = userId
          console.log("User ID:", userId);
          
          // Example: Accessing expiration time
          const expirationTime = new Date(decodedToken.exp * 1000); // Convert UNIX timestamp to milliseconds
          console.log("Expiration Time:", expirationTime);
      } catch (error) {
          console.error("Error parsing JWT token:", error);
      }
    } else {
        console.error("JWT token not found in session storage");
    }

    const rideDetails = {rideName, rideTime, passengers, start, end, distance, uniqueID}
    const response = await fetch('http://localhost:4000/api/workouts/rider', 
      {
        method: 'POST',
        body: JSON.stringify(rideDetails),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const json = await response.json()

    if (response.ok)
      {
        console.log("Ride Added")
      }
    else
    {
      console.log(json.error)
    }

    // Makes sure that both the start and end destination have been set
    if (start && end) {

      // Makes a new instance of direction services to calculate the distance and passes in the origin, destination, and mode of transportation
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          // If status is okay, set directions to result
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

  // If its not loaded the site will say "loading..."
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background"> 
    <div className={classes.container}>
      <Paper className={classes.formContainer}>
        <Typography variant="h6">Post a Ride</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Ride Name"
            value={rideName}
            onChange={(e) => setRideName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Time"
            type="time"
            value={rideTime}
            onChange={(e) => setRideTime(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Number of Passengers"
            select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            fullWidth
            margin="normal"
          >
            {[1, 2, 3, 4, 5, 6].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            inputRef={startRef}
            label="Starting Destination"
            fullWidth
            margin="normal"
          />
          <TextField
            inputRef={endRef}
            label="Ending Destination"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className={classes.createButton}>
            Create
          </Button>
        </form>
      </Paper>
      <div className={classes.mapContainer}>
        {directions && (
          <div>
            <Typography variant="h6">Ride Distance: {distance}</Typography>
            <GoogleMap
              mapContainerStyle={{ height: '400px', width: '100%' }}
              center={{ lat: 34.052235, lng: -118.243683 }}
              zoom={8}
            >
              <DirectionsRenderer directions={directions} />
            </GoogleMap>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default PostRide;