'use client'
import React, { useState } from 'react';
import styles from './contact.module.css';
import { toast } from 'react-toastify';

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
        toast.success(data.message);
        toast.info('A team member will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Error sending message:', data.message);
        toast.error(data.message || 'Error sending messag');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to submit contact form');
      //   alert('Failed to submit contact form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className={styles.myInputClass}
        />
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className={styles.myInputClass}
        />
      </div>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        required
        className={styles.myTextareaClass}
      />
      <button className={styles.myButton} type="submit">Send Message</button>
    </form>

  );
};

export default CreateContactForm;
