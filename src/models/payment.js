const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'successful'], default: 'pending' }
  });
  
  module.exports = mongoose.model('Payment', paymentSchema);