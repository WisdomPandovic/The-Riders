// src/app/users/reset/[id]/index.js
"use client"
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const router = useParams();
  const { id: token } = useParams(); // Use 'id' instead of 'token' if your dynamic route is [id]

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setMessage('Invalid token');
    }
  }, [token]);

  const handleResetPassword = async () => {

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/resetPassword', {
        token, // Use 'id' instead of 'token'
        password,
      });

      if (response.status === 200) {
        setMessage('Password reset successfully');
        toast.success(response.status);
      } else {
        setMessage('Password reset failed');
        toast.error('Password reset failed')
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Error resetting password');
    }
  };

  return (
    <div className='container mt-5 mb-5 d-flex justify-content-center align-items-center min-vh-100'>
    <div className='text-center'>
      <h1 className='pt-3'>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-control-sm border-warning mt-3"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control form-control-sm border-warning mt-3"
            required
          />
        </div>
        <button type="submit" className='btn btn-warning text-white mt-3'>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  </div>
  );
}
