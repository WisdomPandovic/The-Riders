// import connectDB from '../../../lib/connectDB';
import connectToDatabase from '../../../lib/mongodb';
import BlogPost from '../../../src/models/blog';

export default async function handler(req, res) {
  // await connectDB();
  await connectToDatabase();

  const { id } = req.query;

  try {
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Error fetching blog post' });
  }
}
