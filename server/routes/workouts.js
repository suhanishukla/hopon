import express from "express";
import * as functions from '../controllers/workoutController.js';

const router = express.Router();

//get all workouts
router.get('/', functions.all_users)

//get a single workout
router.get('/:id', functions.get_user)

//post a new workout
router.post('/', functions.new_users)

//delete a new workout
router.delete('/:id',functions.deleteUser)

//update a new workout
router.patch('/:id',functions.updateUser)

export default router