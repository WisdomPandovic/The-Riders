// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Define the upload directory
// const uploadDirectory = path.join(__dirname, '..', '..', '..', 'public', 'uploads');

// // Ensure the upload directory exists
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// // Define storage for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './public/uploads'); // Destination directory
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// // Initialize multer with storage settings
// const upload = multer({ 
//   storage, 
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
// });

// // upload.fields([
// //       { name: 'image', maxCount: 1 },
// //     ]);

// export default upload;

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the upload directory using /tmp, which is writable in Vercel
const uploadDirectory = path.join('/tmp', 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Destination directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Initialize multer with storage settings
const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
});

// Example usage
// app.post('/upload', upload.single('file'), (req, res) => {
//   res.send('File uploaded successfully.');
// });

export default upload;

