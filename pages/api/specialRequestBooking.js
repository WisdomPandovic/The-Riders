// // import mongoose from 'mongoose';
// // import specialRequestBooking from '../../src/app/models/specialRequestBooking'; 
// // import User from '../../src/app/models/user';


// // const connectDB = async () => {
// //     try {
// //         await mongoose.connect('mongodb://localhost:27017/rider_app');
// //         console.log('MongoDB connected successfully');
// //     } catch (error) {
// //         console.error('Error connecting to MongoDB:', error);
// //         process.exit(1); // Exit the process on failure
// //     }
// // };

// // // Call the connectDB function once at the beginning of your API route file
// // connectDB();

// // export default async function handler(req, res) {
// //     if (req.method === 'POST') {
// //         try {
// //             let userValue = req.body.user; 
// //             const {
// //                 email,
// //                 phone,
// //                 vehicle,
// //                 airport,
// //                 pickupLocation,
// //                 dropOffLocation,
// //                 flightNumber,
// //                 pickupDate,
// //                 pickupTime,
// //                 durationInHours,
// //                 requestType,
// //                 status
// //             } = req.body;

// //             if (userValue) {
// //                 try {
// //                     // Find the user in the database based on the provided information (e.g., name, email)
// //                     const existingUser = await User.findOne({ $or: [{ name: userValue }, { email: userValue }] });
            
// //                     if (existingUser) {
// //                         // If the user is found, use their ObjectId for the booking
// //                         userValue = existingUser._id;
// //                     } else {
// //                         // If the user is not found, handle the case accordingly (e.g., create a new user entry, if allowed)
// //                         // Here you can add logic to create a new user entry if allowed
// //                         // For example:
// //                         // const newUser = new User({ name: userValue, email: userValue });
// //                         // const savedUser = await newUser.save();
// //                         // userValue = savedUser._id;
// //                         console.error('User not found in the database');
// //                         // You can choose to throw an error or handle this case in another way
// //                         // throw new Error('User not found in the database');
// //                     }
// //                 } catch (error) {
// //                     console.error('Error finding or creating user:', error);
// //                     // You can choose to throw an error or handle this case in another way
// //                     // throw new Error('Error finding or creating user');
// //                 }
// //             }
            
// //             // Proceed with the booking creation
// //             try {
// //                 // Create a new booking using the formData
// //                 const newSpecialRequestBooking = new specialRequestBooking({
// //                     name: userValue, // Assign userValue instead of user
// //                     email,
// //                     phone,
// //                     vehicle,
// //                     airport,
// //                     pickupLocation,
// //                     dropOffLocation,
// //                     flightNumber,
// //                     pickupDate,
// //                     pickupTime,
// //                     durationInHours,
// //                     requestType,
// //                     status
// //                 });
            
// //                 // Save the booking to the database
// //                 const savedSpecialRequestBooking = await newSpecialRequestBooking.save();
            
// //                 // Respond with a success message and the created booking object
// //                 res.status(201).json({ message: 'Booking created successfully!', specialRequestBooking: savedSpecialRequestBooking });
// //             } catch (error) {
// //                 console.error('Error creating booking:', error);
// //                 // Respond with an error message
// //                 res.status(500).json({ message: 'Error creating booking' });
// //             }
// //         } catch (error) {
// //             console.error('Error creating booking:', error);
// //             res.status(500).json({ message: 'Error creating booking' });
// //         }
// //     } else {
// //         res.status(405).json({ message: 'Method not allowed' });
// //     }
// // }


// import mongoose from 'mongoose';
// import SpecialRequestBooking from '../../src/app/models/specialRequestBooking'; 
// import User from '../../src/app/models/user';

// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/rider_app');
//         console.log('MongoDB connected successfully');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//         process.exit(1); // Exit the process on failure
//     }
// };

// // Call the connectDB function once at the beginning of your API route file
// connectDB();

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         try {
//             let userValue = req.body.user; 
//             const {
//                 name,
//                 email,
//                 phone,
//                 vehicle,
//                 airport,
//                 pickupLocation,
//                 dropOffLocation,
//                 flightNumber,
//                 pickupDate,
//                 pickupTime,
//                 durationInHours,
//                 requestType,
//                 status
//             } = req.body;

//             if (!name) {
//                 // Check if name is provided in the request body
//                 return res.status(400).json({ message: 'Name is required' });
//             }

//             console.log('Request Body:', req.body); // Log the entire request body

//             if (userValue) {
//                 try {
//                     // Find the user in the database based on the provided information (e.g., name, email)
//                     const existingUser = await User.findOne({ $or: [{ name: userValue }, { email: userValue }] });
            
//                     if (existingUser) {
//                         // If the user is found, use their ObjectId for the booking
//                         userValue = existingUser._id;
//                     } else {
//                         // If the user is not found, create a new user entry
//                         const newUser = new User({ name: userValue, email: userValue }); // Save name along with email
//                         const savedUser = await newUser.save();
//                         userValue = savedUser._id; // Assign the ObjectId to userValue
//                     }
//                 } catch (error) {
//                     console.error('Error finding or creating user:', error);
//                     return res.status(500).json({ message: 'Error finding or creating user' });
//                 }
//             }
            
//             // Proceed with the booking creation
//             try {
//                 // Create a new booking using the formData
//                 const newSpecialRequestBooking = new SpecialRequestBooking({
//                     name: userValue, // Assign userValue instead of user
//                     email,
//                     phone,
//                     vehicle,
//                     airport,
//                     pickupLocation,
//                     dropOffLocation,
//                     flightNumber,
//                     pickupDate,
//                     pickupTime,
//                     durationInHours,
//                     requestType,
//                     status
//                 });

//                 console.log('New SpecialRequestBooking:', newSpecialRequestBooking); // Log the newSpecialRequestBooking
            
//                 // Save the booking to the database
//                 const savedSpecialRequestBooking = await newSpecialRequestBooking.save();
            
//                 // Respond with a success message and the created booking object
//                 res.status(201).json({ message: 'Booking created successfully!', specialRequestBooking: savedSpecialRequestBooking });
//             } catch (error) {
//                 console.error('Error creating booking:', error);
//                 // Respond with an error message
//                 res.status(500).json({ message: 'Error creating booking' });
//             }
//         } catch (error) {
//             console.error('Error creating booking:', error);
//             res.status(500).json({ message: 'Error creating booking' });
//         }
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// }

// import express from 'express';
// import mongoose from 'mongoose';
// import SpecialRequestBooking from '../../src/app/models/specialRequestBooking'; 
// import User from '../../src/app/models/user';

// const app = express();

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/rider_app');
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit the process on failure
//   }
// };

// connectDB();

// export default async function handler(req, res) {
//     console.log('Request Body:', req.body); // Log the request body to see its content
//     if (req.method === 'POST') {
//         try {
//             const {
//                 name,
//                 email,
//                 phone,
//                 vehicle,
//                 airport,
//                 pickupLocation,
//                 dropOffLocation,
//                 flightNumber,
//                 pickupDate,
//                 pickupTime,
//                 durationInHours,
//                 requestType,
//                 status
//             } = req.body;

//             console.log('Name:', name); // Log the 'name' property to check its value

//             if (!name || !email || !phone || !vehicle || !pickupLocation || !dropOffLocation || !pickupDate || !pickupTime || !durationInHours || !requestType || !status) {
//                 return res.status(400).json({ message: 'Missing required fields' });
//             }
            
//             // Proceed with the booking creation
//             try {
//                 // Create a new booking using the formData
//                 const newSpecialRequestBooking = new SpecialRequestBooking({
//                     name,
//                     email,
//                     phone,
//                     vehicle,
//                     airport,
//                     pickupLocation,
//                     dropOffLocation,
//                     flightNumber,
//                     pickupDate,
//                     pickupTime,
//                     durationInHours,
//                     requestType,
//                     status
//                 });
            
//                 // Save the booking to the database
//                 const savedSpecialRequestBooking = await newSpecialRequestBooking.save();
            
//                 // Respond with a success message and the created booking object
//                 res.status(201).json({ message: 'Booking created successfully!', specialRequestBooking: savedSpecialRequestBooking });
//             } catch (error) {
//                 console.error('Error creating booking:', error);
//                 // Respond with an error message
//                 res.status(500).json({ message: 'Error creating booking' });
//             }
//         } catch (error) {
//             console.error('Error creating booking:', error);
//             res.status(500).json({ message: 'Error creating booking' });
//         }
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// }


import express from 'express';
import mongoose from 'mongoose';
import SpecialRequestBooking from '../../src/app/models/specialRequestBooking'; 
import User from '../../src/app/models/user';

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/rider_app');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process on failure
  }
};

connectDB();

export default async function handler(req, res) {
    console.log('Request Body:', req.body); // Log the request body to see its content
    if (req.method === 'POST') {
        try {
            const {
                name,
                email,
                phone,
                vehicle,
                airport,
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

            if (!name || !email || !phone || !vehicle || !pickupLocation || !dropOffLocation || !pickupDate || !pickupTime || !durationInHours || !requestType || !status) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            
            // Check if a user with the provided email already exists
            let user = await User.findOne({ email });

            // If the user doesn't exist, create a new user
            if (!user) {
                user = new User({ name, email, phone });
                await user.save();
            }

            // Proceed with the booking creation
            const newSpecialRequestBooking = new SpecialRequestBooking({
                name: user._id, // Use user's _id for the booking
                email,
                phone,
                vehicle,
                airport,
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
