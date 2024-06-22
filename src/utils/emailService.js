const nodemailer = require('nodemailer');

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME, // Use environment variables to protect sensitive information
        pass: process.env.EMAIL_PASSWORD
    },
});

// Function to send email
const sendConfirmationEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.C,
        to,
        subject,
        text,
    };


    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve(info.response);
            }
        });
    });
};

module.exports = sendConfirmationEmail;
