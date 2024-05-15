const mongoose = require('mongoose');

const specialRequestBookingSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    bookingDate: { type: Date, default: Date.now },
    requestType: { type: String, required: true }, // Type of special request (e.g., wheelchair-accessible vehicle, pet-friendly vehicle)
    pickupLocation: { type: String, required: true },
    dropOffLocation: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    durationInHours: { type: Number, required: true, min: 1, max: 24 }, // Duration in hours, ranging from 1 to 24
    additionalInformation: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('SpecialRequestBooking', specialRequestBookingSchema);
