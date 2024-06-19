import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Blog from '../../src/models/blog'; 
import upload from '../../muilterConfig'; // Import the Multer configuration
import { verifyToken,isAdmin } from '../../src/middleware/authMiddleware';
import connectToDatabase from '../../lib/mongodb';
// import connectDB from '../../lib/connectDB';

const app = express();

console.log('__dirname:', __dirname);

app.use('/uploads', express.static(path.join(__dirname, '..', '..', '..', 'public', 'uploads')));

export const config = {
  api: {
    bodyParser: false // Disable automatic body parsing
  }
};

const handler = async (req, res) => {
  console.log('Handler function called.');
  await connectToDatabase();
  // await connectDB(); 

  try {
    switch (req.method) {
      case 'GET':
        console.log('** Retrieved ID from URL:', req.query.id);
        // Check if an ID is provided in the URL parameter
        if (req.query.id) {
          console.log('Fetching blog post with ID:', req.query.id); 
          const blog = await Blog.findById(req.query.id);
          if (blog) { // Check if blog is found
            console.log('Blog post found:', blog);
            return res.json(blog); // Return the fetched blog
          } else {
            console.log('Blog post not found');
            return res.status(404).json({ message: 'Blog post not found' });
          }
        } else {
          console.log('Fetching all blog posts');
          const blogs = await Blog.find();
          return res.json(blogs);
        }
      case 'POST':
        isAdmin(req, res, async () => {
        console.log('Processing POST request');
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

export default (req, res) => {
  if (req.method === 'POST') {
    verifyToken(req, res, () => {
      isAdmin(req, res, () => {
        handler(req, res);
      });
    });
  } else {
    handler(req, res);
  }
};
