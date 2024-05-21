import React from 'react';
import styles from './home.module.css';
import Image from 'next/image';


const RideComfortSection = () => {
  return (
    <div className="container text-left mt-5 mb-5">
      <p className={styles.customIconColor}>Our Ride</p>
      <h2 className={styles.customColorGray}>Feel comfortable in our ride</h2>
      <div className="row mt-4">
        <div className="col-lg-4 col-md-6 mb-3">
          <div className={styles.imageContainer}>
            <Image src="/images/Riders.jpg" alt="Image 1" className={styles.image} width="100" 
              height={400}  
              layout="responsive" />
            <div className={styles.overlayText}>
              Relax and unwind as our professional drivers whisk you away to your destination in style.
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div className={styles.imageContainer}>
            <Image src="/images/riders-photos (4).jpg" alt="Image 1" className={styles.image} width="100"  
              height={400}  
              layout="responsive" />
            <div className={styles.overlayText}>
              At our company, we prioritize the comfort and satisfaction of our riders above all else.
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div className={styles.imageContainer}>
            <Image src="/images/riders-photos (6).jpg" alt="Image 1" className={styles.image} width="100" 
              height={400} 
              layout="responsive" />
            <div className={styles.overlayText}>
              Indulge in a journey of comfort and luxury with our expert drivers.
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div className={styles.imageContainer}>
            <Image src="/images/riders-photos (5).jpg" alt="Image 1" className={styles.image} width="100" 
              height={400}  
              layout="responsive" />
            <div className={styles.overlayText}>
              Experience the epitome of comfort and convenience as our skilled drivers navigate through the city streets, providing a smooth and enjoyable ride for every passenger.
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div className={styles.imageContainer}>
            <Image src="/images/riders-photos (3).jpg" alt="Image 1" className={styles.image} width="100" 
              height={400}  
              layout="responsive" />
            <div className={styles.overlayText}>
              Embark on a journey of serenity with our team of experienced drivers. From the moment you step into our vehicles, you'll feel the difference in comfort and care.
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div className={styles.imageContainer}>
            <Image src="/images/riders-photos (7).jpg" alt="Image 1" className={styles.image} width="100"  
              height={400}  
              layout="responsive" />
            <div className={styles.overlayText}>
              At our company, we understand the importance of ensuring a comfortable and safe journey for every member of your family, especially your little ones. Our drivers are trained to provide a child-friendly environment, complete with cozy seating arrangements and entertainment options to keep your kids happy throughout the ride.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideComfortSection;
