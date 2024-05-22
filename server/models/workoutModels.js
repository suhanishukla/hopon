import mongoose from "mongoose";

const Schema = mongoose.Schema
const users = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('users',users)