'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from "./user.module.css";
import { toast } from 'react-toastify';

const CreateSigninForm = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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

    const data = await response.json();

    if (response.status === 401 && data.message === 'Invalid password') {
      // Specific handling for invalid password
      setError('Invalid password');
      toast.error('Invalid password');
    } else if (response.status === 404 && data.message === 'User not found') {
      // Handling for user not found
      setError('User not found');
      toast.error('User not found');
    } else if (!response.ok) {
      throw new Error(data.message || 'Failed to sign in');
    } else {
      // Save token and user data in local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Call the onSignIn function passed from the parent component
      if (onSignIn) {
        onSignIn(data.user);
      }

      // Display success toast
      toast.success('Sign in successful!');

      router.push('/home');
    }
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
