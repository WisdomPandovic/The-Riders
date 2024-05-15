const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    facilities: [String],
    distanceFromCityCenter: { type: Number }
  });
  
  module.exports  = mongoose.model('Airport', airportSchema);