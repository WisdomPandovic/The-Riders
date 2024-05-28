// import React from 'react';
// import styles from './service.module.css'; 
// import Image from 'next/image';

// const ServiceFocusComponent = () => {
//   return (
//     <div className="container mt-5 mb-5">
//       <h2 className={styles.customColorGray}>Our Service</h2>
//       <p className={styles.customIconColor}>Focus on safety, wherever you go</p>
//       <div className="row mt-4">
//         <div className="col-md-4">
//           <img src="/images/airport.jpg" alt="Service 1" className={styles.serviceImage} />
//           <h2  className='mt-2'>Airport Transfer</h2>
//           <p className='gray-dark'>With additional wait time and flight tracking in case of delays, our service is optimized to make every airport transfer a breeze</p>
//         </div>
//         <div className="col-md-4">
//           <img src="/images/chauffeur-2.jpg" alt="Service 2" className={styles.serviceImage} />
//           <h2 className='mt-2'>Full-Day Chauffeur</h2>
//           <p className='gray-dark'>The finest car and best chauffeur at your service to take you anywhere for up to 12 hours.</p>
//         </div>
//         <div className="col-md-4">
//           <img src="/images/chauffeur-3.jpg" alt="Service 3" className={styles.serviceImage} />
//           <h2 className='mt-2'>By Hours Trips</h2>
//           <p className='gray-dark'>Your schedule require a certain hours? We'll be flexible with your needs with its hourly Service chauffeur</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceFocusComponent;


import React from 'react';
import Image from 'next/image';
import styles from './service.module.css'; 

const ServiceFocusComponent = () => {
  return (
    <div className="container mt-5 mb-5">
      <h2 className={styles.customColorGray}>Our Service</h2>
      <p className={styles.customIconColor}>Focus on safety, wherever you go</p>
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className={styles.imageContainer}>
            <Image 
              src="/images/airport.jpg" 
              alt="Service 1" 
              fill
              className={styles.serviceImage}
            />
          </div>
          <h2 className="mt-2">Airport Transfer</h2>
          <p className="gray-dark">With additional wait time and flight tracking in case of delays, our service is optimized to make every airport transfer a breeze</p>
        </div>
        <div className="col-md-4 mb-3">
          <div className={styles.imageContainer}>
            <Image 
              src="/images/chauffeur-2.jpg" 
              alt="Service 2" 
              fill
              className={styles.serviceImage}
            />
          </div>
          <h2 className="mt-2">Full-Day Chauffeur</h2>
          <p className="gray-dark">The finest car and best chauffeur at your service to take you anywhere for up to 12 hours.</p>
        </div>
        <div className="col-md-4 mb-3">
          <div className={styles.imageContainer}>
            <Image 
              src="/images/chauffeur-3.jpg" 
              alt="Service 3" 
              fill
              className={styles.serviceImage}
            />
          </div>
          <h2 className="mt-2">By Hours Trips</h2>
          <p className="gray-dark">Your schedule require a certain hours? We&apos;ll be flexible with your needs with its hourly Service chauffeur</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceFocusComponent;
