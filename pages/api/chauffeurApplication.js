// import express from 'express';
// import path from 'path';
// // import mongoose from 'mongoose';
// import ChauffeurApplication from '../../src/models/chauffeurApplication';
// import upload from '../../muilterConfig';
// import sendConfirmationEmail from '../../src/utils/emailService';
// // import connectToDatabase from '../../lib/mongodb';
// import connectDB from '../../lib/connectDB';

// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Incoming Request Body:', req.body);
//   next();
// });

// console.log('__dirname:', __dirname);

// app.use('/uploads', express.static(path.join(__dirname, '..', '..', '..', 'public', 'uploads')));




// // export const config = {
// //   api: {
// //     bodyParser: false 
// //   }
// // };

// async function handler(req, res) {
//   // await connectToDatabase();
//   await connectDB();
//   // console.log('Handler function called.');

//   try {
//     // Parse JSON bodies
//     app.use(express.json());

//     switch (req.method) {
//       case 'GET':
//         const chauffers = await ChauffeurApplication.find();
//         return res.json(chauffers);

//       case 'POST':
//         upload.single('image')(req, res, async (err) => {
//           if (err) {
//             console.error('Multer error:', err);
//             return res.status(500).json({ message: 'Error uploading image' });
//           }

//           console.log('Req File:', req.file);

//           if (!req.file) {
//             console.error('No file uploaded');
//             return res.status(400).json({ message: 'No image uploaded' });
//           }

//           console.log('File Name:', req.file.originalname);
//           console.log('File Path:', req.file.path);

//           const { name, email, phone, address, city, state, zipCode, yearsOfExperience, availability, additionalInformation } = req.body;
//           console.log('Request Body:', req.body);

//           if (!name || !email || !phone || !address || !city || !state || !zipCode || !yearsOfExperience || !availability) {
//             return res.status(400).json({ message: 'Missing required fields' });
//           }

//           const newChauffer = new ChauffeurApplication({
//             name,
//             email,
//             phone,
//             address,
//             city,
//             state,
//             zipCode,
//             yearsOfExperience,
//             availability,
//             additionalInformation,
//             image: req.file.filename
//           });

//           await newChauffer.save();

//           // Send a confirmation email
//           const emailSubject = 'Chauffer Application Confirmation';
//           const emailText = `Hello ${name},\n\nYour record has been recorded. Here are the details:\n\n${JSON.stringify(req.body, null, 2)}\n\nThank you for applying to become our Chauffer!`;

//           try {
//             await sendConfirmationEmail(email, emailSubject, emailText);
//             console.log('Confirmation email sent successfully');
//           } catch (error) {
//             console.error('Error sending confirmation email:', error);
//           }

//           return res.status(201).json({ message: 'Chauffer created successfully!' });
//         });
//         break;

//       case 'PUT':
//         console.log('Request Method:', req.method);  // Log the request method
//         console.log('Request Headers:', req.headers);  // Log the request headers
//         console.log('Full Request Body:', req.body);  // Log the full request body
//         console.log('Raw Request Body:', JSON.stringify(req.body));
//         console.log('PUT request received for updating chauffeur application.');

//         // ** Logging for debugging PUT request:**
//         console.log('Request Body (before parsing):', req.rawBody); // Assuming rawBody is accessible

//         // Add a check to ensure req.body is parsed correctly
//         if (typeof req.body === 'string') {
//           console.log('Request body is a string. Parsing JSON.');
//           req.body = JSON.parse(req.body);
//         }

//         const { userId, decision } = req.body || {};
//         console.log('userId:', userId); // Check if userId is correctly extracted
//         console.log('decision:', decision);

//         if (!userId || !decision) {
//           return res.status(400).json({ message: 'Missing required fields' });
//         }

//          // Validate decision to be either 'Accepted' or 'Rejected'
//          if (decision !== 'accepted' && decision !== 'rejected') {
//           return res.status(400).json({ message: 'Invalid decision. Must be either "Accepted" or "Rejected"' });
//         }

//         const updatedChauffeur = await ChauffeurApplication.findByIdAndUpdate(userId, { status: decision }, { new: true });

//         if (!updatedChauffeur) {
//           return res.status(404).json({ message: 'Chauffeur application not found' });
//         }

//         // Send confirmation email
//         const emailSubject = `Chauffer Application ${decision}`;
//         const emailText = `Dear ${updatedChauffeur.name},\n\nYour application has been ${decision}.\n\nBest regards,\nThe Riders Team`;

//         try {
//           await sendConfirmationEmail(updatedChauffeur.email, emailSubject, emailText);
//           console.log('Confirmation email sent successfully');
//         } catch (error) {
//           console.error('Error sending confirmation email:', error);
//         }

//         return res.json({ message: 'Chauffeur status updated successfully', chauffeur: updatedChauffeur });
//         break;

//       default:
//         res.status(405).json({ message: 'Method not allowed' });
//         break;
//     }
//     console.log('Handler function execution complete.');
//   } catch (error) {
//     console.error('Server error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }

// export default handler;


import express from 'express';
import path from 'path';
// import mongoose from 'mongoose';
import ChauffeurApplication from '../../src/models/chauffeurApplication';
import Chauffeur from '../../src/models/chauffeur';
import upload from '../../muilterConfig';
import sendConfirmationEmail from '../../src/utils/emailService';
import connectToDatabase from '../../lib/mongodb';
// import connectDB from '../../lib/connectDB';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use((req, res, next) => {
  console.log('Incoming Request Body:', req.body);
  next();
});

console.log('__dirname:', __dirname);

app.use('/uploads', express.static(path.join(__dirname, '..', '..', '..', 'public', 'uploads')));




// export const config = {
//   api: {
//     bodyParser: false 
//   }
// };

async function handler(req, res) {
  await connectToDatabase();
  // await connectDB();
  // console.log('Handler function called.');

  try {
    // Parse JSON bodies
    app.use(express.json());

    switch (req.method) {
      case 'GET':
        const chauffers = await ChauffeurApplication.find();
        return res.json(chauffers);

      case 'POST':
        upload.single('image')(req, res, async (err) => {
          if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ message: 'Error uploading image' });
          }

          console.log('Req File:', req.file);

          if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No image uploaded' });
          }

          console.log('File Name:', req.file.originalname);
          console.log('File Path:', req.file.path);

          const { name, email, phone, address, city, state, zipCode, yearsOfExperience, availability, additionalInformation } = req.body;
          console.log('Request Body:', req.body);

          if (!name || !email || !phone || !address || !city || !state || !zipCode || !yearsOfExperience || !availability) {
            return res.status(400).json({ message: 'Missing required fields' });
          }

          const newChauffer = new ChauffeurApplication({
            name,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
            yearsOfExperience,
            availability,
            additionalInformation,
            image: req.file.filename
          });

          await newChauffer.save();

          // Send a confirmation email
          const emailSubject = 'Chauffer Application Confirmation';
          const emailText = `Hello ${name},\n\nYour record has been recorded. Here are the details:\n\n${JSON.stringify(req.body, null, 2)}\n\nThank you for applying to become our Chauffer!`;

          try {
            await sendConfirmationEmail(email, emailSubject, emailText);
            console.log('Confirmation email sent successfully');
          } catch (error) {
            console.error('Error sending confirmation email:', error);
          }

          return res.status(201).json({ message: 'Chauffer created successfully!' });
        });
        break;

        case 'PUT':
          const { userId, decision } = req.body || {};
  
          if (!userId || !decision) {
            return res.status(400).json({ message: 'Missing required fields' });
          }
  
          if (decision !== 'accepted' && decision !== 'rejected') {
            return res.status(400).json({ message: 'Invalid decision. Must be either "accepted" or "rejected"' });
          }
  
          const updatedChauffeurApplication = await ChauffeurApplication.findByIdAndUpdate(
            userId,
            { status: decision },
            { new: true }
          );
  
          if (!updatedChauffeurApplication) {
            return res.status(404).json({ message: 'Chauffeur application not found' });
          }
  
          if (decision === 'accepted') {
            // Create a new Chauffeur document based on the accepted application
            const newChauffeur = new Chauffeur({
              name: updatedChauffeurApplication.name,
              email: updatedChauffeurApplication.email,
              phone: updatedChauffeurApplication.phone,
              address: updatedChauffeurApplication.address,
              city: updatedChauffeurApplication.city,
              state: updatedChauffeurApplication.state,
              zipCode: updatedChauffeurApplication.zipCode,
              yearsOfExperience: updatedChauffeurApplication.yearsOfExperience,
              availability: updatedChauffeurApplication.availability,
              additionalInformation: updatedChauffeurApplication.additionalInformation,
              image: updatedChauffeurApplication.image,
            });
  
            await newChauffeur.save();
  
            // Send confirmation email to the applicant
            const emailSubject = 'Chauffer Application Accepted';
            const emailText = `Dear ${updatedChauffeurApplication.name},\n\nYour application has been accepted.\n\nBest regards,\nThe Riders Team`;
  
            try {
              await sendConfirmationEmail(updatedChauffeurApplication.email, emailSubject, emailText);
              console.log('Confirmation email sent successfully');
            } catch (error) {
              console.error('Error sending confirmation email:', error);
            }
          } else if (decision === 'rejected') {
            // Send rejection email to the applicant
            const emailSubject = 'Chauffer Application Rejected';
            const emailText = `Dear ${updatedChauffeurApplication.name},\n\nYour application has been rejected.\n\nBest regards,\nThe Riders Team`;
  
            try {
              await sendConfirmationEmail(updatedChauffeurApplication.email, emailSubject, emailText);
              console.log('Rejection email sent successfully');
            } catch (error) {
              console.error('Error sending rejection email:', error);
            }
          }
  
          return res.json({ message: `Chauffeur application status updated to ${decision}`, chauffeur: updatedChauffeurApplication });
        
        default:
          res.status(405).json({ message: 'Method not allowed' });
      }
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  export default handler;
  