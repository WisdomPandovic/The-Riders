import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Ride from '../../src/app/models/ride'; 
import multer from 'multer';
import fs from 'fs';

const app = express();

console.log('__dirname:', __dirname);

// const uploadDirectory = path.join(__dirname, '../../../../uploads');
// const uploadDirectory = path.join(__dirname, 'public', 'uploads');
const uploadDirectory = path.join(__dirname, '..', '..', '..', 'public', 'uploads');



if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads'); // Destination directory
  },
});


const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
});

upload.fields([
  { name: 'image', maxCount: 1 },
]);

// app.use('/uploads', express.static(path.join(__dirname, '../../../../uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, '..', '..', '..', 'public', 'uploads')));

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
