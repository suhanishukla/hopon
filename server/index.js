import express from "express"
import mongoose from "mongoose";
import workoutRoutes from './routes/workouts.js';
//express App
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})

//react to requests
app.use('/api/workouts',workoutRoutes)

//connect to mongoDB
mongoose.connect("mongodb+srv://thenerd127:eggertsucks@mernapp.fewuv4o.mongodb.net/?retryWrites=true&w=majority&appName=MERNapp")
    .then(()=> {
        //listen from requesets
        app.listen(4000, ()=>{
            console.log("listening on port 4000!!")
        })
    })
    .catch((error)=>{
        console.log(error)
    })