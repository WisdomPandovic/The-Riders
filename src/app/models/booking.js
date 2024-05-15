const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    airport: { type: mongoose.Schema.Types.ObjectId, ref: 'Airport', required: true },
    bookingDate: { type: Date, default: Date.now },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true }, 
    pickupLocation: { type: String, required: true },
    dropOffLocation: {type: String, required: true},
    flightNumber: {type: String},
    status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' }
  });

  module.exports = mongoose.model('Booking', bookingSchema);