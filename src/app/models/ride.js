const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    dateTime: { type: Date, required: true },
    vehicleType: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    image: { type: String } 
  });
  
  module.exports = mongoose.model('Ride', rideSchema);