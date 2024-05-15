import mongoose from 'mongoose';
import Booking from '../../src/app/models/booking'; 
import User from '../../src/app/models/user';


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/rider_app');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process on failure
    }
};

// Call the connectDB function once at the beginning of your API route file
connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            let userValue = req.body.user; 
            const {
                email,
                phone,
                vehicle,
                airport,
                pickupLocation,
                dropOffLocation,
                flightNumber,
                pickupDate,
                pickupTime,
                status
            } = req.body;

            if (userValue) {
                try {
                    // Find the user in the database based on the provided information (e.g., name, email)
                    const existingUser = await User.findOne({ $or: [{ name: userValue }, { email: userValue }] });
            
                    if (existingUser) {
                        // If the user is found, use their ObjectId for the booking
                        userValue = existingUser._id;
                    } else {
                        // If the user is not found, handle the case accordingly (e.g., create a new user entry, if allowed)
                        // Here you can add logic to create a new user entry if allowed
                        // For example:
                        // const newUser = new User({ name: userValue, email: userValue });
                        // const savedUser = await newUser.save();
                        // userValue = savedUser._id;
                        console.error('User not found in the database');
                        // You can choose to throw an error or handle this case in another way
                        // throw new Error('User not found in the database');
                    }
                } catch (error) {
                    console.error('Error finding or creating user:', error);
                    // You can choose to throw an error or handle this case in another way
                    // throw new Error('Error finding or creating user');
                }
            }
            
            // Proceed with the booking creation
            try {
                // Create a new booking using the formData
                const newBooking = new Booking({
                    name: userValue, // Assign userValue instead of user
                    email,
                    phone,
                    vehicle,
                    airport,
                    pickupLocation,
                    dropOffLocation,
                    flightNumber,
                    pickupDate,
                    pickupTime,
                    status
                });
            
                // Save the booking to the database
                const savedBooking = await newBooking.save();
            
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
