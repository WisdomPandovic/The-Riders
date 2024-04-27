// app/api/subscriptions.js
import mongoose from 'mongoose';
import { Subscription } from '../../src/app/models/subscription'; // Import the subscription model

const connectDB = async () => {
  try {
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
      const { email } = req.body;

      const newSubscription = new Subscription({ email });

      const savedSubscription = await newSubscription.save();

      res.status(201).json({ message: 'Subscription created successfully!', subscription: savedSubscription });
    } catch (error) {
      console.error('Error creating subscription:', error);
      res.status(500).json({ message: 'Error creating subscription' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
