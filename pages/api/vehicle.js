import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Vehicle from '../../src/models/vehicle';
import upload from '../../muilterConfig';
import { verifyToken, isAdmin } from '../../src/middleware/authMiddleware';
import connectToDatabase from '../../lib/mongodb';
// import connectDB from '../../lib/connectDB';

const app = express();

app.use('/uploads', express.static(path.join(__dirname, '..', '..', '..', 'public', 'uploads')));

// Configure API endpoint
export const config = {
  api: {
    bodyParser: false
  }
};

const handler = async (req, res) => {
  console.log('Handler function called.');
  await connectToDatabase();
  // await connectDB(); 

  try {
    switch (req.method) {
      case 'GET':
        const vehicles = await Vehicle.find();
        return res.json(vehicles);
      case 'POST':
        isAdmin(req, res, async () => {
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

export default (req, res) => {
  if (req.method === 'POST') {
    verifyToken(req, res, () => {
      isAdmin(req, res, () => {
        handler(req, res);
      });
    });
  } else {
    handler(req, res);
  }
};