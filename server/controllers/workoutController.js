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
    const {rideName, rideDate, rideTime, passengers, start, end, distance, uniqueID} = req.body

    //add doc to db
    try {
        const rid = await ride.create({rideName, rideDate, rideTime, passengers, start, end, distance, uniqueID})
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

    const delete_user = await users.findOneAndDelete({_id: id})

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



export {new_users, all_users, loginUser, deleteUser, updateUser, renderLogIn, rider, getUserRides};