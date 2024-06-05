//the purpose of this file is to create a bunch of function to reference inside router file
import users from "../models/workoutModels.js";
import ride from "../models/rideModel.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

//make secret key
const SECRET_KEY = 'yourmomgae';


//make a log in Token
const generateToken = (user) => {
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      SECRET_KEY,
      { expiresIn: '1h' } // Token expiration time
    );
  };

  const joinRide = async (req, res) => {
    const { rideId } = req.body;
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const userId = decoded.id;
  
      const user = await users.findById(userId);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      const ride1 = await ride.findById(rideId);
      if (!ride1) {
        return res.status(400).json({ error: 'Ride not found' });
      }
  
      // Check if the user is trying to join their own ride
      if (ride1.uniqueID.toString() === userId) {
        return res.status(400).json({ error: 'Cannot join your own ride' });
      }
  
      // Check if the user is already in the passenger list
      const userInList = ride1.passengerList.some(passenger => passenger.toString() === userId);
      if (userInList) {
        return res.status(400).json({ error: 'User already joined the ride' });
      }
  
      // Check if there's room for more passengers
      if (ride1.currentPassengers >= ride1.passengers) {
        return res.status(400).json({ error: 'No available seats' });
      }
  
      // Add user to the passenger list
      ride1.passengerList.push(userId);
      ride1.currentPassengers += 1;
      await ride1.save();
  
      res.status(200).json({ message: 'Successfully joined the ride' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to join the ride' });
    }
  };
  
  

//get all workouts
const all_users = async(req, res) => {
    const everyone = await ride.find({}).sort({createdAt: -1}) //sort by descending order
    res.status(200).json(everyone) //gives us user documents in an array
}

const getUserRides = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const userRides = await ride.find({ uniqueID: userId }).sort({ createdAt: -1 });

    if (!userRides) {
      return res.status(404).json({ message: 'No rides found for this user' });
    }

    res.status(200).json(userRides);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rides', error });
  }
};

//get a single workout
const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const user = await users.findOne({ username, password });
      if (!user) {
        return res.status(404).json({ message: 'User not found or incorrect password' });
      }
  
      const token = generateToken(user);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// In your workoutController.js



//create a new workout
const new_users = async(req, res) =>{
    const {username, password, first_name} = req.body

    //add doc to db
    try {
        const user = await users.create({username, password, first_name})
        // res.status(200).redirect('/login')
        res.status(200).json(user)
    }
    catch (error)
    {
        res.status(400).json(req.body)
    }
}

//create a new ride
const rider = async(req, res) =>{
    const {rideName, rideDate, rideTime, passengers, start, end, distance, additionalInfo, uniqueID} = req.body

    //add doc to db
    try {
        const rid = await ride.create({rideName, rideDate, rideTime, passengers, start, end, distance, additionalInfo, uniqueID})
        res.status(200).json(rid)
    }
    catch (error)
    {
        res.status(400).json(req.body)
    }
}

//delete a workout
const deleteUser = async(req, res) =>
{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({error: "No such user found"})
    }

    const delete_user = await ride.findOneAndDelete({_id: id})

    if (!delete_user){
        return res.status(400).json({error: "No such user"}) //return to prevent it from running rest of the code
    }

    res.status(200).redirect('/login')

}

//update a workout
const updateUser = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({error: "No such user found"})
    }

    const update_user = await users.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if (!update_user){
        return res.status(400).json({error: "No such user"}) //return to prevent it from running rest of the code
    }

    res.status(200).json(update_user)

}

//render the log in page:
const renderLogIn = async(req, res) => {
    res.render('Login');
}

const getJoinedRides = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const joinedRides = await ride.find({ passengerList: userId }).sort({ createdAt: -1 });

    if (!joinedRides) {
      return res.status(404).json({ message: 'No joined rides found for this user' });
    }

    res.status(200).json(joinedRides);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch joined rides', error });
  }
};



export {new_users, all_users, loginUser, deleteUser, updateUser, renderLogIn, rider, getUserRides, joinRide, getJoinedRides};