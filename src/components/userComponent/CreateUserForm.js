'use client'
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from "./user.module.css";

function CreateUserForm () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    paymentInfo: ''
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True if no errors
  };

  const createUser = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.message === 'User created successfully!') {
        toast.success('User created successfully!');
        setFormData({ name: '', email: '', password: '', paymentInfo: '', phone: '' });
      } else {
        console.error('Error creating user:', data.message);
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

      <button type="submit" className={styles.myButton}>Create User</button>
      <div className={`${styles.inputWrapper} mt-3`}>
      <p>I already have an account.</p> <a className="sign-link" href="/users/sign-in">Log in Now</a>
      </div> 
    </form>
  );
};

export default CreateUserForm;
