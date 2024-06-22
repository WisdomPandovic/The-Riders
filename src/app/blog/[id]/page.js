"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'short' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options).replace(',', '');
};

const BlogPost = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/blog/${id}`);
        setBlogPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading blog post...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className='container-fluid mt-5'>
      <div className='container mb-5'>
        <div className='row'>
          <div className='col-lg-6'>
            <Image src={`/uploads/${blogPost.image}`} alt={blogPost.title} width={100}
              height={400}
              layout="responsive" />
            <div className='bg-customIconColor mt-3 d-flex'>
              <p>{formatDate(blogPost.createdAt)}</p>
              <p className='ms-2'>-</p>
              <p className='ms-2'>by {blogPost.author}</p>
            </div>
            <h3 className='mt-3 customColorGray mb-4 bold'>{blogPost.header}</h3>
            <p>{blogPost.content}</p>
            <h3 className='mt-5 customColorGray'>Comments</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;