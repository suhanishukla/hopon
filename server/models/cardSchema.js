import mongoose from "mongoose";

const Schema = mongoose.Schema

const ride = new Schema({

    post_author: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    start_time: {
        type: String,
        required: true
    },

    passengers: {
        type: Number,
        required: true
    },

    origin: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    distance: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }

}, {timestamps: true})

export default mongoose.model('ride',ride);