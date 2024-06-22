// pages/requestPasswordReset.js
'use client'
import { useState } from 'react';
import axios from 'axios';

export default function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/requestPasswordReset', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending password reset email');
    }
  };

  return (
    <div className='container-fluid mt-5 mb-5 d-flex justify-content-center align-items-center min-vh-100'>
    <div className='text-center'>
      <h1 className='pt-4'>Request Password Reset</h1>
      <p>Start the reset process by entering the information below.</p>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="form-control form-control-sm border-warning"
          required
        />
       
        <button type="submit" className='btn btn-warning text-white mt-3'>Request Password Reset</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  </div>
  
  );
}
