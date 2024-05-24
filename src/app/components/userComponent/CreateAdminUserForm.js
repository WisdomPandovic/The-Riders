
'use client'
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from "./user.module.css";

function CreateAdminUserForm () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    paymentInfo: '',
    role: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True if no errors
  };

  const createUser = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        // Handle case where token is not found
        console.error('Token not found');
        toast.error('Token not found');
        return;
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        'Authorization': `Bearer ${token}`,
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.message === 'User created successfully!') {
        toast.success('User created successfully!');
        setFormData({ name: '', email: '', password: '', phone: '', paymentInfo: '' });
      } else {
        if (response.status === 401 && data.message === 'Token has expired') {
          console.error('Error creating Admin user:', data.message);
          toast.error('Session expired. Please log in again.');

        } else {
          console.error('Error creating user:', data.message);
          toast.error('Error creating user: ' + data.message);
        }
      
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      if (validateForm()) {
        createUser();
      } else {
        console.error('Form validation failed:', errors);
      }
    }} className={styles.userForm}>
         {/* <div className={styles.inputWrapper}> */}
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={styles.myInputClass}
        placeholder='Enter Full Name'
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={styles.myInputClass}
        placeholder='Enter Email'
      />
      {errors.email && <p className="error">{errors.email}</p>}
      {/* </div> */}

      {/* <div className={styles.inputWrapper}> */}
      <label htmlFor="name">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className={styles.myInputClass}
        placeholder='Enter Password'
      />
      {errors.password && <p className="error">{errors.password}</p>}

      <label htmlFor="email">Phone No:</label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className={styles.myInputClass}
        placeholder='Enter phone no'
      />
      {errors.phone && <p className="error">{errors.phone}</p>}
      {/* </div> */}

      <label htmlFor="role">Role:</label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className={styles.myInputClass}
      >
        <option value="">Select Role</option>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      {errors.role && <p className="error">{errors.role}</p>}

      <button type="submit" className={styles.myButton}>Create User</button>

    </form>
  );
};

export default CreateAdminUserForm;
