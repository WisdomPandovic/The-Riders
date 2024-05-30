// lib/connectDB.js

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUri = process.env.CUSTOM_MONGODB_URI || 'mongodb://localhost:27017/rider_app'; // Use an environment variable for the URI
    await mongoose.connect(dbUri, {
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process on failure
  }
};

export default connectDB;
