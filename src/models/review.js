const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String },
    description: { type: String },
    taxi_experience: { type: String, required: true }, 
    image: { type: String }, 
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
