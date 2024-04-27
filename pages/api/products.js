// import path from 'path';
// import mongoose from 'mongoose';
// import Product from '../../src/app/models/product'; // Import your product model
// import multer from 'multer';
// import fs from 'fs';

// // Define the destination directory for uploads
// const uploadDirectory = path.join(__dirname, '../../uploads');

// // Ensure that the upload directory exists, create it if it doesn't
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// // Configure Multer to use the upload directory
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDirectory);
//   },
// });

// // Initialize multer middleware once globally
// // Update Multer configuration to handle multiple fields with different names
// const upload = multer({
//   storage,
//   // Specify the maximum number of files to accept
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
// });

// // Use the updated multer middleware to handle file uploads
// upload.fields([
//   { name: 'image1', maxCount: 1 },
//   { name: 'image2', maxCount: 1 },
//   { name: 'image3', maxCount: 1 },
//   { name: 'image4', maxCount: 1 },
// ]);


// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/nextjs_apps');
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit the process on failure
//   }
// };

// connectDB();

// // Export configuration for the API route
// export const config = {
//   api: {
//     bodyParser: false // Disable automatic body parsing
//   }
// };

// async function handler(req, res) {
//   try {
//     switch (req.method) {
//       case 'GET':
//         const products = await Product.find();
//         return res.json(products);
//       case 'POST':
//         // Use the globally defined multer middleware
//         upload.array('images', 4)(req, res, async (err) => {
//           if (err) {
//             console.error('Multer error:', err);
//             return res.status(500).json({ message: 'Error uploading images' });
//           }

//           console.log('Req Files:', req.files); // Log uploaded files

//           if (!req.files || req.files.length === 0) {
//             console.error('No files uploaded');
//             return res.status(400).json({ message: 'No images uploaded' });
//           }

//           const images = req.files.map((file) => file.path);

//           console.log('Images:', images); // Log the extracted image paths

//           const { name, description, price } = req.body;

//           if (!name || !price) {
//             return res.status(400).json({ message: 'Missing required fields' });
//           }

//           const newProduct = new Product({ name, description, price, images });
//           await newProduct.save();

//           return res.status(201).json({ message: 'Product created successfully!' });
//         });
//         break;
//       default:
//         res.status(405).json({ message: 'Method not allowed' });
//     }
//   } catch (error) {
//     console.error('Server error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }

// export default handler;

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Product from '../../src/app/models/product'; // Import your product model
import multer from 'multer';
import fs from 'fs';

// Create an instance of the Express application
const app = express();

console.log('__dirname:', __dirname);


// Define the destination directory for uploads
const uploadDirectory = path.join(__dirname, '../../../../uploads');

// Ensure that the upload directory exists, create it if it doesn't
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure Multer to use the upload directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
});

// Initialize multer middleware once globally
// Update Multer configuration to handle multiple fields with different names
const upload = multer({
  storage,
  // Specify the maximum number of files to accept
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
});

// Use the updated multer middleware to handle file uploads
upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
]);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../../../../uploads')));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/nextjs_apps');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process on failure
  }
};

connectDB();

// Export configuration for the API route
export const config = {
  api: {
    bodyParser: false // Disable automatic body parsing
  }
};

async function handler(req, res) {
  console.log('Handler function called.'); // Log when the handler function is called
  try {
    switch (req.method) {
      case 'GET':
        const products = await Product.find();
        return res.json(products);
      case 'POST':
        // Use the globally defined multer middleware
        upload.array('images', 4)(req, res, async (err) => {
          if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ message: 'Error uploading images' });
          }

          console.log('Req Files:', req.files); // Log uploaded files

          if (!req.files || req.files.length === 0) {
            console.error('No files uploaded');
            return res.status(400).json({ message: 'No images uploaded' });
          }

           // Log file paths and names
           req.files.forEach((file) => {
            console.log('File Name:', file.originalname);
            console.log('File Path:', file.path);
          });

          const images = req.files.map((file) => file.filename);

          console.log('Images:', images); // Log the extracted image paths

          const { name, description, price } = req.body;

          if (!name || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
          }

          const newProduct = new Product({ name, description, price, images });
          await newProduct.save();

          return res.status(201).json({ message: 'Product created successfully!' });
        });
        break;
      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
    console.log('Handler function execution complete.'); // Log when the handler function execution is complete
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default handler;
