'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './CreateReview.module.css'; // Create a corresponding CSS module for styling

const CreateReview = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [taxiExperience, setTaxiExperience] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('rating', rating);
    formData.append('taxi_experience', taxiExperience);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Review submitted successfully!');
        // Clear form
        setName('');
        setTitle('');
        setDescription('');
        setRating(0);
        setTaxiExperience('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.myInputClass}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.myInputClass}
          />
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
           
          />
        </div> */}
        <div className="mb-3">
          <label className="form-label">Taxi Experience</label>
          <textarea
            value={taxiExperience}
            onChange={(e) => setTaxiExperience(e.target.value)}
            placeholder='Share details of your own experience with our company'
            required
            className={styles.myTextareaClass}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <div className={styles.starRating}>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= rating ? styles.on : styles.off}
                  onClick={() => setRating(index)}
                >
                  <FontAwesomeIcon icon={faStar} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>
        <button type="submit" className={styles.myButton}>Submit Review</button><br></br>
        <button type="submit" className={styles.myButtonSignup}>Not a member? <a href='/users' className='nav-link'>Sign Up</a></button>
      </form>
    </div>
  );
};

export default CreateReview;
