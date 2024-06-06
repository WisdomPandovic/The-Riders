import express from 'express';
import mongoose from 'mongoose';
mongoose.models = {};
import SpecialRequestBooking from '../../src/app/models/specialRequestBooking';
import User from '../../src/app/models/user';
import Vehicle from '../../src/app/models/vehicle'; // Assuming there's a Vehicle model
import Airport from '../../src/app/models/airport'; // Assuming there's an Airport model
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

      if (!name || !email || !phone || !vehicleId || !pickupLocation || !dropOffLocation || !pickupDate || !pickupTime || !durationInHours || !requestType || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Fetch vehicle and airport names using their IDs
      const vehicle = await Vehicle.findById(vehicleId);
      const airport = await Airport.findById(airportId);

      if (!vehicle || !airport) {
        return res.status(404).json({ message: 'Vehicle or Airport not found' });
      }

      const vehicleName = vehicle.name; // Assuming the vehicle model has a 'name' field
      const airportName = airport.name; // Assuming the airport model has a 'name' field

      // Uncomment and adjust the user check and creation if needed
      // Check if a user with the provided email already exists
      // let user = await User.findOne({ email });

      // If the user doesn't exist, create a new user
      // if (!user) {
      //     user = new User({ name, email, phone });
      //     await user.save();
      // }

      // Proceed with the booking creation
      const newSpecialRequestBooking = new SpecialRequestBooking({
        name, // Use user's _id for the booking if implemented
        email,
        phone,
        vehicle: vehicleName, // Use vehicle name instead of ID
        airport: airportName, // Use airport name instead of ID
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
