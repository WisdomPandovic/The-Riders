// app/api/subscriptions.js
import mongoose from 'mongoose';
import  Subscription from '../../src/app/models/subscription'; 
import sendConfirmationEmail from '../../src/utils/emailService';
import connectToDatabase from '../../lib/mongodb';
// import connectDB from '../../lib/connectDB';

export default async function handler(req, res) {
  await connectToDatabase();
  // await connectDB(); 

  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      const newSubscription = new Subscription({ email });

      const savedSubscription = await newSubscription.save();

       // Send a confirmation email
       const emailSubject = 'Contact Form Submission';
       const emailText = `Hello,\n\nThank you for subscribing to our newsletter. You will now receive our weekly newsletter.\n\nBest regards,\nThe Riders Team`;
 
       try {
         await sendConfirmationEmail(email, emailSubject, emailText);
         console.log('Confirmation email sent successfully');
       } catch (error) {
         console.error('Error sending confirmation email:', error);
       }

      res.status(201).json({ message: 'Subscription created successfully!', subscription: savedSubscription });
    } catch (error) {
      console.error('Error creating subscription:', error);
      res.status(500).json({ message: 'Error creating subscription' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
