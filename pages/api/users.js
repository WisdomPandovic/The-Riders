// app/api/users.js
import mongoose from 'mongoose';
import User from '../../src/app/models/user'; // Import the user model

const connectDB = async () => {
  try {
   // await mongoose.connect('mongodb://localhost:27017');  Replace with your MongoDB connection string
    await mongoose.connect('mongodb://localhost:27017/nextjs_apps');
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
        const { name, email } = req.body;
  
        const newUser = new User({ name, email });
  
        const savedUser = await newUser.save();
  
        res.status(201).json({ message: 'User created successfully!', user: savedUser });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  