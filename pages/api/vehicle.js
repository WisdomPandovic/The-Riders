import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Vehicle from '../../src/app/models/vehicle';
import multer from 'multer';
import fs from 'fs';

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

// Configure API endpoint
export const config = {
  api: {
    bodyParser: false // Disable automatic body parsing
  }
};

async function handler(req, res) {
  console.log('Handler function called.');
  try {
    switch (req.method) {
      case 'GET':
        const vehicles = await Vehicle.find();
        return res.json(vehicles);
      case 'POST':
        upload.single('image')(req, res, async (err) => {
          if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ message: 'Error uploading image' });
          }

          console.log('Req File:', req.file);

          if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No image uploaded' });
          }

          console.log('File Name:', req.file.originalname);
          console.log('File Path:', req.file.path);

          // Extract vehicle data from request body
          const { name, type, capacity, passenger, luggage, amenities, available } = req.body;

          // Validate required fields
          if (!name || !type || !capacity || !passenger || !luggage || !amenities) {
            return res.status(400).json({ message: 'Missing required fields' });
          }

          // Create a new vehicle instance
          const newVehicle = new Vehicle({
            name,
            type,
            image: req.file.filename,
            capacity,
            passenger,
            luggage,
            amenities,
            available
          });

          console.log(newVehicle)
          // Save the new vehicle to the database
          await newVehicle.save();

          // Send success response
          return res.status(201).json({ message: 'Vehicle created successfully!' });
        });
        break;
      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
    console.log('Handler function execution complete.');
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Export the handler function as the default export
export default handler;
