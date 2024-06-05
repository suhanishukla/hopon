import mongoose from "mongoose";

const Schema = mongoose.Schema;
const rideSchema = new Schema({
  rideName: {
    type: String,
    required: true
  },
  
  rideDate: {
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
  currentPassengers: {
    type: Number,
    default: 0
  },
  passengerList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
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
  uniqueID: {
    type: String,
    required: true
  },
}, { timestamps: true });

export default mongoose.model('Ride', rideSchema);
