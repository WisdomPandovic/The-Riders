import mongoose from 'mongoose';
import Airport from '../../src/app/models/airport';
import { verifyToken, isAdmin } from '../../src/middleware/authMiddleware';
import connectToDatabase from '../../lib/mongodb';
// import connectDB from '../../lib/connectDB';


const handler = async (req, res) => {
  await connectToDatabase();
  // await connectDB(); 
  
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
