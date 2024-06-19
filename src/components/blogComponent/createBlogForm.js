'use client'
import React, { useState } from 'react';
import styles from './blog.module.css';
import { toast } from 'react-toastify';

const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted!');
  
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        // Handle case where token is not found
        console.error('Token not found');
        toast.error('Token not found');
        return;
      }
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('header', header);
      formData.append('content', content);
      formData.append('tags', tags);
      formData.append('image', image);

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Blog created successfully!', data);
        toast.success(data.message);
        setTitle('');
        setAuthor('');
        setHeader('');
        setContent('');
        setTags('');
        setImage(null);
      } else {
        if (response.status === 401 && data.message === 'Token has expired') {
          console.error('Error creating vehicle:', data.message);
          toast.error('Session expired. Please log in again.');
          // Redirect to login page or prompt user to log in
        } else {
          console.error('Error creating blog:', data.message);
          toast.error('Error creating blog: ' + data.message);
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`pt-5 ${styles.form}`}>
      <label htmlFor="name">Title<span className="text-danger">*</span></label>
      <input type="text" id="title" name="tile" value={title} onChange={(e) => setTitle(e.target.value)} required className={styles.myInputClass}/>

      <label htmlFor="type">Author<span className="text-danger">*</span></label>
      <input type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} required className={styles.myInputClass} />

      <label htmlFor="capacity">Header<span className="text-danger">*</span></label>
      <input type="text" id="header" name="header" value={header} onChange={(e) => setHeader(e.target.value)} required className={styles.myInputClass}/>

      <label htmlFor="passenger">Content<span className="text-danger">*</span></label>
      <input type="text" id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} className={styles.myInputClass} />

      <label htmlFor="luggage">Tags</label>
      <input type="text" id="tags" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} className={styles.myInputClass} />

      <label htmlFor="image">Upload Image</label>
      <input type="file" id="image" name="image" onChange={handleImageChange} className={styles.myInputClass} />
      <button type="submit" className={styles.myButton}>Create Blog</button>
    </form>
  );
};

export default CreateBlogForm;
