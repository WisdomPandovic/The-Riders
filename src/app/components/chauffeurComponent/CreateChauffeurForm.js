'use client'
import { useState } from 'react';
import styles from './chauffeur.module.css'; 
import { toast } from 'react-toastify';

function CreateChauffeurForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    yearsOfExperience: '',
    availability: '',
    additionalInformation: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch('/api/chauffeurApplication', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success
        toast.success(data.message);
        setFormData({ name: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', yearsOfExperience: '', availability: '', additionalInformation: '', image: null });
        // Show additional message
        toast.info('A team member will get back to you soon.');

      } else {
        // Handle failure
        toast.error(data.message || 'Failed to create Chauffeur');
      }
    } catch (error) {
      console.error('Error submitting chauffeur form:', error);
      toast.error('Failed to submit chauffeur form');
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
      <div className={styles.inputWrapper}>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className={styles.myInputClass}
        />
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className={styles.myInputClass}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
          className={styles.myInputClass}
        />
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          required
          className={styles.myInputClass}
        />

      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          required
          className={styles.myInputClass}
        />
        <input
          type="number"
          id="yearsOfExperience"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          placeholder="Years of Experience"
          required
          className={styles.myInputClass}
        />

      </div>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          placeholder="Availability"
          required
          className={styles.myInputClass}
        />
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange} 
          required
          className={styles.myInputClass}
        />


      </div>
      <div className={styles.inputWrapper}>
        <textarea
          id="additionalInformation"
          name="additionalInformation"
          value={formData.additionalInformation}
          onChange={handleChange}
          placeholder="Additional Information"
          className={styles.myInputClass}
        />
      </div>

      <button className={styles.myButton} type="submit">Send Message</button>
    </form>
  );
}

export default CreateChauffeurForm;
