const mongoose = require('mongoose');

const chauffeurApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    availability: { type: String, required: true },
    additionalInformation: { type: String },
    status: { type: String, default: 'Pending' },
    applicationDate: { type: Date, default: Date.now },
    image: { type: String, required: true, }
});

module.exports = mongoose.model('ChauffeurApplication', chauffeurApplicationSchema);
