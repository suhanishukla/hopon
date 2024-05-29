//the purpose of this file is to create a bunch of function to reference inside router file
import users from "../models/workoutModels.js";
import mongoose from "mongoose";

//get all workouts
const all_users = async(req, res) => {
    const everyone = await users.find({}).sort({createdAt: -1}) //sort by descending order
    res.status(200).json(everyone) //gives us user documents in an array
}

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
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// const get_user = async(req, res) => {
//     const {id} = req.params

//     if (!mongoose.Types.ObjectId.isValid(id))
//     {
//         res.status(404).json({error: "No such user found"})
//     }

//     const single_user = await users.findById(id)
//     if (!single_user){
//         return res.status(404).json({error: "No such user"}) //return to prevent it from running rest of the code
//     }
//     res.status(200).json(single_user)
// }

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



export {new_users, all_users, loginUser, deleteUser, updateUser, renderLogIn};