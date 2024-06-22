'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from "./user.module.css";
import Image from 'next/image';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    image: '',
  });

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Decode token to get user details
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken)
      // Set user details in state
      setUserDetails({
        name: decodedToken.name,
        email: decodedToken.email,
        phone: decodedToken.phone || '',
        role: decodedToken.role || '',
      });
    }
  }, []);

  return (
    <div className="container pb-5">
      <div className="row">
        <div className="col-lg-6 bg-white card d-flex justify-content-center align-items-center mb-2">
        <div className='p-5'>
              <div className={styles.imageWrapper}>
                <Image src="/images/images.png" alt="User Profile" width={200} height={200} className="img-fluid rounded-circle" />
              </div>
            </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className={`${styles.userForm} card bg-white`}>

            <form>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={userDetails.name}
                  readOnly
                  className={styles.myInputClass}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={userDetails.email}
                  readOnly
                  className={styles.myInputClass}
                />
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  type="text"
                  value={userDetails.phone}
                  readOnly
                  className={styles.myInputClass}
                />
              </div>
              <div>
                <label>Account Type</label>
                <input
                  type="text"
                  value={userDetails.role}
                  readOnly
                  className={styles.myInputClass}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
