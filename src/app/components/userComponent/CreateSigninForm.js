'use client'
import React, { useState } from 'react';
import styles from "./user.module.css";
import { toast } from 'react-toastify';

const CreateSigninForm = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    // Perform client-side validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Perform sign-in logic
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();

      // Save token and user data in local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Call the onSignIn function passed from the parent component
      if (onSignIn) {
        onSignIn(data.user);
      }

       // Display success toast
       toast.success('Sign in successful!');

    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in. Please try again.');
      toast.error('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className={styles.userForm}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.myInputClass}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.myInputClass}
          />
        </div>
        <button type="submit" className={styles.myButton}>Sign In</button>
      </form>
    </div>
  );
};

export default CreateSigninForm;
