// chauffeur.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chauffeurSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  availability: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  applicationDate: { type: Date, default: Date.now },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Chauffeur', chauffeurSchema);
