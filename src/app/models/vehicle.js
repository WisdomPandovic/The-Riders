const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the vehicle
    type: { type: String, required: true }, // Type of vehicle (e.g., Sedan, SUV)
    image: { type: String }, // URL of the vehicle image
    capacity: { type: Number, required: true }, // Passenger capacity of the vehicle
    passenger: { type: Number, required: true }, // Number of passengers currently in the vehicle
    luggage: { type: Number, required: true }, // Luggage capacity of the vehicle
    amenities: [String], // Array of amenities provided in the vehicle
    available: { type: Boolean, default: true } // Availability status of the vehicle
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
