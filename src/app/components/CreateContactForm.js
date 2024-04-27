'use client'
import React, { useState } from 'react';

const CreateContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
     
      if (data.message === 'Contact created successfully!') {
        // Handle success (e.g., clear form, display message)
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Error creating user:', data.message);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    //   alert('Failed to submit contact form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br></br>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required /><br></br>
      
        <button type="submit">Submit</button>
    </form>
  );
};

export default CreateContactForm;
