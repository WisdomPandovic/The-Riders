import React from 'react';
import styles from './home.module.css';

const ClientReviews = () => {
  return (
    <div className="container text-center mt-5 mb-5">
      <p className={styles.customIconColor}>Reviews</p>
      <h2 className={styles.customColorGray}>What our clients say about us</h2>
      <div className="row mt-5">
        <div className="col-md-4">
          <img src="/images/riders-photos (1).jpg" alt="Client" className={styles.clientImage} />
        </div>
        <div className="col-md-8">
          <div className='row mb-2'>
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

          <div className='row mb-2'>
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

          <div className='row mb-2'>
            <div className="col-md-2 mt-3">
              <img src="/images/customer-photos (5).jpg" alt="Client" className={styles.clientImages} />
              <p className={styles.customColorGray}>Malik Berry</p>
            </div>
            <div className="col-md-10 ">
              <div className={styles.clientReview}>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
