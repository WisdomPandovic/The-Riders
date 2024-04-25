// import path from 'path';
// import mongoose from 'mongoose';
// import Product from '../../src/app/models/product'; // Import your product model
// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Construct the final path using path.join
//     const finalPath = path.join(__dirname, '../../server/uploads');
//     console.log('Final Upload Path:', finalPath);  // Print the constructed path

//     cb(null, finalPath);
//   },
// });

// const upload = multer({ storage });


// const connectDB = async () => {
//   try {
//     // Replace with your MongoDB connection string
//     await mongoose.connect('mongodb://localhost:27017/nextjs_apps');
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit the process on failure
//   }
// };

// connectDB();

// async function handler(req, res) {
//   switch (req.method) {
//     case 'GET':
//       try {
//         const products = await Product.find();
//         return res.json(products);
//       } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error fetching products' });
//       }
//     case 'POST':
//       try {
//         const upload = multer({ storage }).array('images', 4); // Define multer middleware inline
//         console.log('Upload Middleware:', upload); // Log the upload middleware function

//         // Call the middleware and await the upload result
//         upload(req, res, async (err) => {
//           if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Error uploading images' });
//           }

//           if (!req.files || req.files.length === 0) {
//             console.error('No files uploaded');
//             return res.status(400).json({ message: 'No images uploaded' });
//           }

//           // Extract actual file paths from uploaded images (assuming 'path' property exists)
//           const images = req.files.map((file) => file.path);
//           console.log('Images:', images); // Log the extracted image paths

//           const { name, description, price } = req.body;

//           if (!name || !price) {
//             return res.status(400).json({ message: 'Missing required fields' });
//           }

//           const newProduct = new Product({ name, description, price, images });
//           await newProduct.save(); // Await saving as well

//           return res.status(201).json({ message: 'Product created successfully!' });
//         });
//       } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error creating product' });
//       }
//     default:
//       res.status(405).json({ message: 'Method not allowed' });
//   }
// }

// export default handler;



import path from 'path';
import mongoose from 'mongoose';
import Product from '../../src/app/models/product'; // Import your product model
import multer from 'multer';

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Construct the final path using path.join
    const finalPath = path.join(__dirname, '../../src/app/server/uploads');
    console.log('Final Upload Path:', finalPath);  // Print the constructed path
    cb(null, finalPath);
  },
});

// Initialize multer middleware once globally
const upload = multer({ storage });

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

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const products = await Product.find();
        return res.json(products);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching products' });
      }
      break;
    case 'POST':
      try {
        // Use the globally defined multer middleware
        upload.array('images', 4)(req, res, async (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error uploading images' });
          }

          if (!req.files || req.files.length === 0) {
            console.error('No files uploaded');
            return res.status(400).json({ message: 'No images uploaded' });
          }

          const images = req.files.map((file) => file.path);

          const { name, description, price } = req.body;

          if (!name || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
          }

          const newProduct = new Product({ name, description, price, images });
          await newProduct.save();

          return res.status(201).json({ message: 'Product created successfully!' });
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating product' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;

