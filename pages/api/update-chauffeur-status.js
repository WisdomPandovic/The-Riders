import express from 'express';
import connectToDatabase from '../../lib/mongodb';
import Chauffeur from '../../src/models/chauffeurApplication';
import sendConfirmationEmail from '../../src/utils/emailService';
// import connectDB from '../../lib/connectDB';

const app = express();
app.use(express.json());

export default async function handler(req, res) {
  await connectToDatabase();
  // await connectDB(); 

  if (req.method === 'POST') {
    try {
      const { userId, status } = req.body;
      const chauffeur = await Chauffeur.findById(userId);

      if (!chauffeur) {
        return res.status(404).json({ message: 'Chauffeur not found' });
      }

      chauffeur.status = status;
      await chauffeur.save();

      const subject = `Chauffeur Application ${status}`;
      const text = `Dear ${chauffeur.name},\n\nYour application has been ${decision}.\n\nBest regards,\nThe Riders Team`;

      await sendConfirmationEmail(chauffeur.email, subject, text);

      res.status(200).json({ message: `Chauffeur ${status} successfully` });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Error updating status' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
