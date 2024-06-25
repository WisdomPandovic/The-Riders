import cron from 'node-cron';
import Booking from '../models/booking';
import SpecialRequestBooking from '../models/specialRequestBooking';
import sendEmail from '../utils/emailService';
import connectToDatabase from '../lib/mongodb';
// import connectDB from '../lib/connectDB';

async function sendNotificationEmails() {
    try {
        await connectToDatabase();
        console.log('Database connected successfully');

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Find regular bookings
        const bookings = await Booking.find({
            status: 'confirmed',
            pickupDate: { $gte: new Date(tomorrow.setHours(0, 0, 0, 0)), $lt: new Date(tomorrow.setHours(23, 59, 59, 999)) }
        }).populate('chauffeur');
        console.log(`Found ${bookings.length} regular bookings`);

        // Find special request bookings
        const specialBookings = await SpecialRequestBooking.find({
            status: 'confirmed',
            pickupDate: { $gte: new Date(tomorrow.setHours(0, 0, 0, 0)), $lt: new Date(tomorrow.setHours(23, 59, 59, 999)) }
        }).populate('chauffeur');
        console.log(`Found ${specialBookings.length} special request bookings`);

        // Send emails for regular bookings
        for (const booking of bookings) {
            const emailSubject = 'Your Booking Details for Tomorrow';
            const emailText = `Dear ${booking.name},\n\nHere are your booking details for tomorrow:\n\nPickup Location: ${booking.pickupLocation}\nDrop Off Location: ${booking.dropOffLocation}\nPickup Time: ${booking.pickupTime}\nChauffeur: ${booking.chauffeur.name}\n\nThank you for choosing our service!`;

            try {
                await sendEmail(booking.email, emailSubject, emailText);
                console.log(`Email sent to ${booking.email} for regular booking`);
            } catch (error) {
                console.error(`Error sending email to ${booking.email} for regular booking:`, error);
            }
        }

        // Send emails for special request bookings
        for (const booking of specialBookings) {
            const emailSubject = 'Your Special Booking Details for Tomorrow';
            const emailText = `Dear ${booking.name},\n\nHere are your special booking details for tomorrow:\n\nPickup Location: ${booking.pickupLocation}\nDrop Off Location: ${booking.dropOffLocation}\nPickup Time: ${booking.pickupTime}\nChauffeur: ${booking.chauffeur.name}\n\nThank you for choosing our service!`;

            try {
                await sendEmail(booking.email, emailSubject, emailText);
                console.log(`Email sent to ${booking.email} for special booking`);
            } catch (error) {
                console.error(`Error sending email to ${booking.email} for special booking:`, error);
            }
        }
    } catch (error) {
        console.error('Error in sendNotificationEmails:', error);
    }
}

// Schedule the task to run at 8 AM every day
cron.schedule('* * * * *', sendNotificationEmails); // Temporarily set to run every minute for testing

console.log('Cron job scheduled to send notifications every minute for testing.');
