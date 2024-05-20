const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String },
    description: { type: String },
    taxi_experience: { type: String, required: true }, // Description of the user's experience with the taxi service
    image: { type: String }, // URL or path to the image uploaded by the user
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
