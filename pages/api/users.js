import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../src/app/models/user';
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

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET_KEY; // Ensure this line correctly accesses the environment variable
  if (!secret) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role  },
    secret, // Use the secret from the environment variables
    { expiresIn: '1h' } // Token expires in 1 hour
  );
};

export default async function handler(req, res) {
  await connectToDatabase();
  
  if (req.method === 'GET') {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, password, phone, paymentInfo, role } = req.body;

      // Check if the user with the provided email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ name, email, password: hashedPassword, phone, paymentInfo, role,  });
      const savedUser = await newUser.save();

      res.status(201).json({ message: 'User created successfully!', user: savedUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { email, password } = req.body;
      
      // Check if the user with the provided email exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Password is correct, sign-in successful
      const token = generateToken(existingUser);
      res.status(200).json({ message: 'Sign in successful!', token, user: existingUser });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ message: 'Error signing in' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
