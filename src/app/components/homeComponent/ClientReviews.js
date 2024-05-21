"use client";
import React, { useState, useEffect } from "react";
import styles from './home.module.css';
import axios from 'axios';

const ClientReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/review'); // Replace '/api/reviews' with your API endpoint
        response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const filterReview = response.data.slice(0, 3)
        setReviews(filterReview); // Assuming the response data is an array of reviews
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="container text-center mt-5 mb-5">
      <p className={styles.customIconColor}>Reviews</p>
      <h2 className={styles.customColorGray}>What our clients say about us</h2>
      <div className="row mt-5">
        <div className="col-lg-4 col-md-12 mb-3">
          <img src="/images/riders-photos (1).jpg" alt="Client" className={styles.clientImage} />
        </div>
        <div className="col-lg-8 col-md-12">
          {/* <div className='row mb-2 review-desc'>
            <div className="col-md-2 mt-3">
              <img src="/images/customer-photos (4).jpg" alt="Client" className={styles.clientImages} />
              <p className={styles.customColorGray}>Paul Ghajmin</p>
            </div>
            <div className="col-md-10 ">
              <div className={styles.clientReview}>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
              </div>
            </div>
          </div>

          <div className='row mb-2 review-desc'>
            <div className="col-md-2 mt-3">
              <img src="/images/customer-photos (2).jpg" alt="Client" className={styles.clientImages} />
              <p className={styles.customColorGray}>Mahmoud Ali</p>
            </div>
            <div className="col-md-10 ">
              <div className={styles.clientReview}>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
              </div>
            </div>
          </div>

          <div className='row mb-2 review-desc'>
            <div className="col-md-2 mt-3">
              <img src="/images/customer-photos (5).jpg" alt="Client" className={styles.clientImages} />
              <p className={styles.customColorGray}>Malik Berry</p>
            </div>
            <div className="col-md-10 ">
              <div className={styles.clientReview}>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
              </div>
            </div>
          </div> */}

          {reviews.map((review, index) => (

            <div className="row mb-2 review-desc" key={index}>
              <div className="col-md-2 mt-3">
                <img src={`/uploads/${review.image}`} alt="Client" className={styles.clientImages} />
                <p className={styles.customColorGray}>{typeof review.name === 'object' ? review.name.name : review.name}</p>
              </div>
              <div className="col-md-10">
                <div className={styles.clientReview}>
                  <p>{review.taxi_experience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
