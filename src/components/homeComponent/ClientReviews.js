"use client";
import React, { useState, useEffect } from "react";
import styles from './home.module.css';
import axios from 'axios';
import Image from 'next/image';

const ClientReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/review');
        response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const filterReview = response.data.slice(0, 3)
        setReviews(filterReview);
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
          <Image src="/images/riders-photos (1).jpg" alt="Client" className={styles.clientImage} width={100}
            height={400}
            layout="responsive" />
        </div>
        <div className="col-lg-8 col-md-12">
          <div className='row mb-2 review-desc'>
            <div className="col-md-2 mt-3">
              <Image src="/images/customer-photos (4).jpg" alt="Client" width={50}
                height={50}
                layout="fixed" className={styles.clientImages} />
              <p className={styles.customColorGray}>Sarah Ghajmin</p>
            </div>
            <div className="col-md-10 ">
              <div className={styles.clientReview}>
                <p>&quot;I had an outstanding experience with this taxi service. The driver arrived promptly
                   at the scheduled pickup time and was extremely courteous and professional throughout 
                   the journey. The vehicle was clean and well-maintained, providing a comfortable ride.&quot;</p>
              </div>
            </div>
          </div>

          <div className='row mb-2 review-desc'>
            <div className="col-md-2 mt-3">
              <Image src="/images/customer-photos (2).jpg" alt="Client" width={50}
                height={50}
                layout="fixed" className={styles.clientImages} />
              <p className={styles.customColorGray}>Zara Ali</p>
            </div>
            <div className="col-md-10 ">
              <div className={styles.clientReview}>
                <p>&quot;I appreciated the driver&apos;s knowledge of the area, as they navigated through traffic 
                  efficiently and got me to my destination ahead of schedule. Overall, I highly recommend this 
                  taxi service for anyone looking for reliable transportation and excellent customer service.&quot;</p>
              </div>
            </div>
          </div>

          <div className='row mb-2 review-desc'>
            <div className="col-md-2 mt-3">
              <Image src="/images/customer-photos (5).jpg" alt="Client" width={50}
                height={50}
                layout="fixed" className={styles.clientImages} />
              <p className={styles.customColorGray}>Malik Berry</p>
            </div>
            <div className="col-md-10 ">
              <div className={styles.clientReview}>
                <p> &quot;The app&apos;s interface is intuitive, making it incredibly easy to schedule a ride. I 
                  appreciated the real-time tracking feature, which allowed me to see exactly when my driver
                   would arrive. Speaking of the driver, he was punctual, courteous, and professional. 
                   The car was clean and comfortable, and I felt safe throughout the journey.&quot;</p>
              </div>
            </div>
          </div>

          {/* {reviews.map((review, index) => (

            <div className="row mb-2 review-desc" key={index}>
              <div className="col-md-2 mt-3">
                <img
                  src={`/uploads/${review.image}`}
                  alt="Client"
                  width={50}
                  height={50}
                  layout="fixed"
                  className={styles.clientImages}
                />

                <p className={styles.customColorGray}>{typeof review.name === 'object' ? review.name.name : review.name}</p>
              </div>
              <div className="col-md-10">
                <div className={styles.clientReview}>
                  <p>{review.taxi_experience}</p>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
