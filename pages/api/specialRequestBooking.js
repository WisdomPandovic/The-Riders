import express from 'express';
import mongoose from 'mongoose';
mongoose.models = {};
import SpecialRequestBooking from '../../src/app/models/specialRequestBooking';
import User from '../../src/app/models/user';
import Vehicle from '../../src/app/models/vehicle'; 
import Airport from '../../src/app/models/airport'; 
import sendConfirmationEmail from '../../src/utils/emailService';
import connectToDatabase from '../../lib/mongodb';
// import connectDB from '../../lib/connectDB';

const app = express();

export default async function handler(req, res) {
  await connectToDatabase();
    // await connectDB(); 

  console.log('Request Body:', req.body); // Log the request body to see its content
  if (req.method === 'POST') {
    try {
      const {
        name,
        email,
        phone,
        vehicle: vehicleId,
        airport: airportId,
        pickupLocation,
        dropOffLocation,
        flightNumber,
        pickupDate,
        pickupTime,
        durationInHours,
        requestType,
        status
      } = req.body;

      console.log('Name:', name); // Log the 'name' property to check its value

      if (!name || !email || !phone || !vehicleId || !airportId || !pickupLocation || !dropOffLocation || !pickupDate || !pickupTime || !durationInHours || !requestType || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Fetch vehicle and airport names using their IDs
      const vehicle = await Vehicle.findById(vehicleId);
      const airport = await Airport.findById(airportId);

      if (!vehicle || !airport) {
        return res.status(404).json({ message: 'Vehicle or Airport not found' });
      }

      const vehicleName = vehicle.name; 
      const airportName = airport.name; 

      // Proceed with the booking creation
      const newSpecialRequestBooking = new SpecialRequestBooking({
        name,
        email,
        phone,
        vehicle: vehicleId, // Store the ID in the booking
        airport: airportId, // Store the ID in the booking
        pickupLocation,
        dropOffLocation,
        flightNumber,
        pickupDate,
        pickupTime,
        durationInHours,
        requestType,
        status
      });

      // Save the booking to the database
      const savedSpecialRequestBooking = await newSpecialRequestBooking.save();

      // Send a confirmation email
      const emailSubject = 'Ride Booking Confirmation';
      const emailText = `Hello ${name},\n\nYour ride has been successfully booked. Here are the details:\n\n${JSON.stringify({
        ...req.body,
        vehicle: vehicleName,
        airport: airportName
      }, null, 2)}\n\nThank you for using our service!`;

      try {
        await sendConfirmationEmail(email, emailSubject, emailText);
        console.log('Confirmation email sent successfully');
      } catch (error) {
        console.error('Error sending confirmation email:', error);
      }

      // Respond with a success message and the created booking object
      res.status(201).json({ message: 'Booking created successfully!', specialRequestBooking: savedSpecialRequestBooking });

    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Error creating booking' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}