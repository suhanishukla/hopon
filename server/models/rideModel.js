import mongoose from "mongoose";

const Schema = mongoose.Schema
const ride = new Schema({
    rideName: {
        type: String,
        required: true
    },

    rideTime: {
        type: String,
        required: true
    },

    passengers: {
        type: Number,
        required: true
    },

    start: {
        type: String,
        required: true
    },

    end: {
        type: String,
        required: true
    },

    distance: {
        type: String,
        required: true
    },

}, {timestamps: true})

export default mongoose.model('ride',ride)