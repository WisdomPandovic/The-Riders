import cron from 'node-cron';
import Booking from '../models/booking';
import SpecialRequestBooking from '../models/specialRequestBooking';
import sendEmail from '../utils/emailService';
import connectToDatabase from '../lib/mongodb';
// import connectDB from '../lib/connectDB';

async function sendNotificationEmails() {
    await connectToDatabase();
    // await connectDB();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find regular bookings
    const bookings = await Booking.find({
        status: 'confirmed',
        pickupDate: { $gte: new Date(tomorrow.setHours(0, 0, 0, 0)), $lt: new Date(tomorrow.setHours(23, 59, 59, 999)) }
    }).populate('chauffeur');

    // Find special request bookings
    const specialBookings = await SpecialRequestBooking.find({
        status: 'confirmed',
        pickupDate: { $gte: new Date(tomorrow.setHours(0, 0, 0, 0)), $lt: new Date(tomorrow.setHours(23, 59, 59, 999)) }
    }).populate('chauffeur');

    // Send emails for regular bookings
    for (const booking of bookings) {
        const emailSubject = 'Your Booking Details for Tomorrow';
        const emailText = `Dear ${booking.name},\n\nHere are your booking details for tomorrow:\n\nPickup Location: ${booking.pickupLocation}\nDrop Off Location: ${booking.dropOffLocation}\nPickup Time: ${booking.pickupTime}\nChauffeur: ${booking.chauffeur.name}\n\nThank you for choosing our service!`;

        await sendEmail(booking.email, emailSubject, emailText);
    }

    // Send emails for special request bookings
    for (const booking of specialBookings) {
        const emailSubject = 'Your Special Booking Details for Tomorrow';
        const emailText = `Dear ${booking.name},\n\nHere are your special booking details for tomorrow:\n\nPickup Location: ${booking.pickupLocation}\nDrop Off Location: ${booking.dropOffLocation}\nPickup Time: ${booking.pickupTime}\nChauffeur: ${booking.chauffeur.name}\n\nThank you for choosing our service!`;

        await sendEmail(booking.email, emailSubject, emailText);
    }
}

// Schedule the task to run at 8 AM every day
cron.schedule('0 8 * * *', sendNotificationEmails);

console.log('Cron job scheduled to send notifications at 8 AM every day.');
