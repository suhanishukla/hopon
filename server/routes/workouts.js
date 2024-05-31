import express from "express";
import * as functions from '../controllers/workoutController.js';

const router = express.Router();

//get all workouts
router.get('/getRide', functions.all_users)

router.get('/userRides', functions.getUserRides);

//get a single workout
router.post('/login', functions.loginUser);

//post a new workout
router.post('/signup', functions.new_users)

//delete a new workout
router.delete('/:id',functions.deleteUser)

//update a new workout
router.patch('/:id',functions.updateUser)

//render requests
router.get('/login', functions.renderLogIn);

//post form data into rideModel DataBase
router.post('/rider', functions.rider)

export default router