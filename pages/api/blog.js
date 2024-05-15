import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Blog from '../../src/app/models/blog'; 
import multer from 'multer';
import fs from 'fs';

const app = express();

console.log('__dirname:', __dirname);

const uploadDirectory = path.join(__dirname, '..', '..', '..', 'public', 'uploads');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads'); // Destination directory
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
});

upload.fields([
  { name: 'image', maxCount: 1 },
]);

app.use('/uploads', express.static(path.join(__dirname, '..', '..', '..', 'public', 'uploads')));

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/rider_app');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process on failure
  }
};

connectDB();

export const config = {
  api: {
    bodyParser: false // Disable automatic body parsing
  }
};

async function handler(req, res) {
  console.log('Handler function called.');
  try {
    switch (req.method) {
      case 'GET':
        // Check if an ID is provided in the URL
        if (req.query.id) {
          console.log('Fetching blog post with ID:', req.query.id); 
          const blog = await Blog.findById(req.query.id);
          if (blog) { // Check if blog is found (optional)
            return res.json(blog); // Return the fetched blog
          } else {
            // Handle case where ID doesn't exist (optional)
            return res.status(404).json({ message: 'Blog post not found' });
          }
        } else {
          const blogs = await Blog.find();
          return res.json(blogs);
        }      
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

          const { title, author, header, content, tags, published } = req.body;

          if (!title || !author || !header || !content) {
            return res.status(400).json({ message: 'Missing required fields' });
          }

          const newBlog = new Blog({
            title,
            author,
            header,
            content,
            tags,
            published,
            image: req.file.filename
          });

          await newBlog.save();

          return res.status(201).json({ message: 'Blog created successfully!' });
        });
        break;
      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
    console.log('Handler function execution complete.');
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default handler;
