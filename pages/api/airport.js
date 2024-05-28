// import mongoose from 'mongoose';
// import Airport from '../../src/app/models/airport';
// import { verifyToken, isAdmin } from '../../src/middleware/authMiddleware';

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/rider_app');
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   }
// };

// connectDB();

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const airports = await Airport.find();
//       res.status(200).json({ airports });
//     } catch (error) {
//       console.error('Error fetching airports:', error);
//       res.status(500).json({ message: 'Error fetching airports' });
//     }
//   } else if (req.method === 'POST') {
//        // Only allow admin users to create airports
//        isAdmin(req, res, async () => {
//     try {
//       const { name, location, code, facilities, distanceFromCityCenter } = req.body;
//       const newAirport = new Airport({ name, location, code, facilities, distanceFromCityCenter });
//       const savedAirport = await newAirport.save();
//       res.status(201).json({ message: 'Airport created successfully!', airport: savedAirport });
//     } catch (error) {
//       console.error('Error creating airport:', error);
//       res.status(500).json({ message: 'Error creating airport' });
//     }
//   });
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
  
// }

// export default (req, res) => {
//   verifyToken(req, res, () => {
//     isAdmin(req, res, () => {
//       handler(req, res);
//     });
//   });
// };

import mongoose from 'mongoose';
import Airport from '../../src/app/models/airport';
import { verifyToken, isAdmin } from '../../src/middleware/authMiddleware';
import connectToDatabase from '../../lib/mongodb';

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/rider_app');
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   }
// };

// connectDB();


const handler = async (req, res) => {
  await connectToDatabase();
  
  if (req.method === 'GET') {
    try {
      const airports = await Airport.find();
      res.status(200).json({ airports });
    } catch (error) {
      console.error('Error fetching airports:', error);
      res.status(500).json({ message: 'Error fetching airports' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, location, code, facilities, distanceFromCityCenter } = req.body;
      const newAirport = new Airport({ name, location, code, facilities, distanceFromCityCenter });
      const savedAirport = await newAirport.save();
      res.status(201).json({ message: 'Airport created successfully!', airport: savedAirport });
    } catch (error) {
      console.error('Error creating airport:', error);
      res.status(500).json({ message: 'Error creating airport' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

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
