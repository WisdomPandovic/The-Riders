import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Ride from '../../src/app/models/ride'; 
import upload from '../../muilterConfig';
import connectToDatabase from '../../lib/mongodb';
// import connectDB from '../../lib/connectDB';

const app = express();

console.log('__dirname:', __dirname);

app.use('/uploads', express.static(path.join(__dirname, '..', '..', '..', 'public', 'uploads')));

export const config = {
  api: {
    bodyParser: false // Disable automatic body parsing
  }
};

async function handler(req, res) {
  console.log('Handler function called.');
  await connectToDatabase();
  // await connectDB(); 
  
  try {
    switch (req.method) {
      case 'GET':
        const rides = await Ride.find();
        return res.json(rides);
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

          const { origin, destination, dateTime, vehicleType, price, available } = req.body;

          if (!origin || !destination || !dateTime || !vehicleType || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
          }

          const newRide = new Ride({
            origin,
            destination,
            dateTime,
            vehicleType,
            price,
            available,
            image: req.file.filename
          });

          await newRide.save();

          return res.status(201).json({ message: 'Ride created successfully!' });
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

export default handler;
