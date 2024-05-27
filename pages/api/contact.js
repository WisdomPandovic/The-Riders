import express from 'express';
import mongoose from 'mongoose';
import Contact  from '../../src/app/models/contact'; 
import sendConfirmationEmail from '../../src/utils/emailService';

const app = express();
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/rider_app');
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
      const { name, email, message } = req.body;

      const newContact = new Contact({ name, email, message });

      const savedContact = await newContact.save();

            // Send a confirmation email
            const emailSubject = 'Contact Form Submission';
            const emailText = `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Riders Team`;
      
            try {
              await sendConfirmationEmail(email, emailSubject, emailText);
              console.log('Confirmation email sent successfully');
            } catch (error) {
              console.error('Error sending confirmation email:', error);
            }

      res.status(201).json({ message: 'Contact created successfully!', contact: savedContact });
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ message: 'Error creating contact' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
