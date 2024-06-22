'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from "./user.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    image: '',
  });

  const [error, setError] = useState(null);
  const router = useRouter();

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

  const handleSignOut = () => {
    // Clear token and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to the login page or homepage
    router.push('/home'); // Change '/login' to your actual login page path
  };

  return (
    <div className="container pb-5">
      <div className="row">
        <div className="col-lg-6 bg-white card d-flex justify-content-center align-items-center mb-2">
          <div className='p-5'>
            <div className={styles.imageWrapper}>
              <Image src="/images/images.png" alt="User Profile" width={200} height={200} className="img-fluid rounded-circle" />
            </div>
          </div>
          <div className="mb-3">
              <button className="btn btn-danger me-2" onClick={handleSignOut}>Log Out</button>
              {/* You can link the Sign In button to the sign-in page */}
              <button className={`btn ${styles.signInButton}`} onClick={() => router.push('/users/sign-in')}>Sign In</button>
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
