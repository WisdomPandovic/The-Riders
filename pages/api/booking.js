import express from 'express';
import mongoose from 'mongoose';
import Booking from '../../src/models/booking';
import Chauffeur from '../../src/models/chauffeur';
import User from '../../src/models/user';
import Vehicle from '../../src/models/vehicle';
import Airport from '../../src/models/airport';
import sendConfirmationEmail from '../../src/utils/emailService';
import connectToDatabase from '../../lib/mongodb';
// import connectDB from '../../lib/connectDB';

const app = express();

export default async function handler(req, res) {
    await connectToDatabase();
    // await connectDB();

    if (req.method === 'POST') {
        try {
            // let userValue = req.body.user; 
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
                status
            } = req.body;

            if (!name || !email || !phone || !vehicleId || !airportId || !pickupLocation || !dropOffLocation || !pickupDate || !pickupTime || !status) {
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

            // Find an available chauffeur
            const availableChauffeur = await Chauffeur.findOne({ status: 'active', availability: 'Immediately' });

            // Log available chauffeurs
            const chauffeurs = await Chauffeur.find();
            console.log('All Chauffeurs:', chauffeurs);

            if (!availableChauffeur) {
                return res.status(404).json({ message: 'No available chauffeurs' });
            }

            // if (userValue) {
            //     try {
            //         // Find the user in the database based on the provided information (e.g., name, email)
            //         const existingUser = await User.findOne({ $or: [{ name: userValue }, { email: userValue }] });

            //         if (existingUser) {
            //             // If the user is found, use their ObjectId for the booking
            //             userValue = existingUser._id;
            //         } else {
            //             // If the user is not found, handle the case accordingly (e.g., create a new user entry, if allowed)
            //             // Here you can add logic to create a new user entry if allowed
            //             // For example:
            //             // const newUser = new User({ name: userValue, email: userValue });
            //             // const savedUser = await newUser.save();
            //             // userValue = savedUser._id;
            //             console.error('User not found in the database');
            //             // You can choose to throw an error or handle this case in another way
            //             // throw new Error('User not found in the database');
            //         }
            //     } catch (error) {
            //         console.error('Error finding or creating user:', error);
            //         // You can choose to throw an error or handle this case in another way
            //         // throw new Error('Error finding or creating user');
            //     }
            // }

            // Proceed with the booking creation
            try {
                // Create a new booking using the formData
                const newBooking = new Booking({
                    name, // Assign userValue instead of user
                    email,
                    phone,
                    vehicle: vehicleId,
                    airport: airportId,
                    pickupLocation,
                    dropOffLocation,
                    flightNumber,
                    pickupDate,
                    pickupTime,
                    status,
                    chauffeur: availableChauffeur._id
                });

                // Mark chauffeur as unavailable
                availableChauffeur.availability = 'unavailable';
                await availableChauffeur.save();

                // Save the booking to the database
                const savedBooking = await newBooking.save();

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
                res.status(201).json({ message: 'Booking created successfully!', booking: savedBooking });
            } catch (error) {
                console.error('Error creating booking:', error);
                // Respond with an error message
                res.status(500).json({ message: 'Error creating booking' });
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            res.status(500).json({ message: 'Error creating booking' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
