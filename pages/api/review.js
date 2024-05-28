import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Review from '../../src/app/models/review';
import User from '../../src/app/models/user';
import multer from 'multer';
import fs from 'fs';
import sendConfirmationEmail from '../../src/utils/emailService';
import connectToDatabase from '../../lib/mongodb';

// Create an Express app
const app = express();

// Define upload directory
const uploadDirectory = path.join(__dirname, '..', '..', '..', 'public', 'uploads');

// Create upload directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads'); // Destination directory
  },
});

// Initialize multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', '..', '..', 'public', 'uploads')));

// Connect to MongoDB
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

// Configure API endpoint
export const config = {
    api: {
      bodyParser: false // Disable automatic body parsing
    }
  };

  export default async function handler(req, res) {
    await connectToDatabase();

    try {
        switch (req.method) {
            case 'GET':
                const reviews = await Review.find().populate('name', 'name');
                return res.json(reviews);
            case 'POST':
                upload.single('image')(req, res, async (err) => {
                    if (err) {
                        console.error('Multer error:', err);
                        return res.status(500).json({ message: 'Error uploading image' });
                    }
                    if (!req.file) {
                        console.error('No file uploaded');
                        return res.status(400).json({ message: 'No image uploaded' });
                    }
                    
                    const {
                        name,
                        rating,
                        title,
                        description,
                        taxi_experience,
                    } = req.body;
                    
                    if (!name || !rating || !taxi_experience) {
                        return res.status(400).json({ message: 'Missing required fields' });
                    }
                    
                    // let user = await User.findOne({ name });
                    
                    // if (!user) {
                    //     return res.status(400).json({ message: 'No User with that name' });
                    // }
                    
                    const newReview = new Review({
                        name,
                        rating,
                        title,
                        description,
                        taxi_experience,
                        image: req.file.filename,
                    });
                    
                    const savedNewReview = await newReview.save();

                     // Send a confirmation email
            const emailSubject = 'Review Form Submission';
            const emailText = `Hello ${name},\n\nThank you for your review. We have received your message.\n\nBest regards,\nThe Riders Team`;
      
            try {
              await sendConfirmationEmail(email, emailSubject, emailText);
              console.log('Confirmation email sent successfully');
            } catch (error) {
              console.error('Error sending confirmation email:', error);
            }
                    
                    res.status(201).json({ message: 'Review sent successfully!', newReview: savedNewReview });
                });
                break;
            default:
                res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
