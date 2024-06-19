'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './CreateReview.module.css'; 
import { toast } from 'react-toastify';

const CreateReview = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [taxiExperience, setTaxiExperience] = useState('');
  const [image, setImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      // Check if the user is logged in
      const checkLoggedIn = async () => {
          const token = localStorage.getItem('token');
          if (token) {
              setIsLoggedIn(true);
          } else {
              setIsLoggedIn(false);
          }
      };

      checkLoggedIn();
  }, []);

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

    if (!isLoggedIn) {
      // Display message prompting user to sign up
      toast.error('You must be a member to create a review. Please sign up.');
      return;
  }

    try {
      const response = await axios.post('/api/review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // alert('Review submitted successfully!');
        toast.success('Review submitted successfully!');
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
          <label className="form-label">Name<span className="text-danger">*</span></label>
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
          <label className="form-label">Taxi Experience<span class="text-danger">*</span></label>
          <textarea
            value={taxiExperience}
            onChange={(e) => setTaxiExperience(e.target.value)}
            placeholder='Share details of your own experience with our company'
            required
            className={styles.myTextareaClass}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating<span class="text-danger">*</span></label>
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
          <label className="form-label">Upload Image<span class="text-danger">*</span></label>
          <input type="file" className="form-control" required onChange={handleImageChange} />
        </div>
        <button type="submit" className={styles.myButton}>Submit Review</button><br></br>
        <div className={`mt-2 ${styles.myButtonSignup} d-flex text-center justify-content-center`}>
          <p className='m-2'>Not a member?</p>
          <a href='/users' className='sign-link m-2'>Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default CreateReview;
