'use client'
import React, { useState } from 'react';
import styles from './vehicle.module.css';
import { toast } from 'react-toastify';

const CreateVehicleForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [passenger, setPassenger] = useState('');
  const [luggage, setLuggage] = useState('');
  const [amenities, setAmenities] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted!');

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        // Handle case where token is not found
        console.error('Token not found');
        toast.error('Token not found');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('capacity', capacity);
      formData.append('passenger', passenger);
      formData.append('luggage', luggage);
      formData.append('amenities', amenities.split(',').map(amenity => amenity.trim()));
      formData.append('image', image);

      const response = await fetch('/api/vehicle', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Vehicle created successfully!', data);
        toast.success(data.message);
        setName('');
        setType('');
        setLuggage('');
        setAmenities('');
        setPassenger('');
        setCapacity('');
        setImage(null);
      } else {
        if (response.status === 401 && data.message === 'Token has expired') {
          console.error('Error creating vehicle:', data.message);
          toast.error('Session expired. Please log in again.');
          // Redirect to login page or prompt user to log in
        } else {
          console.error('Error creating vehicle:', data.message);
          toast.error('Error creating vehicle: ' + data.message);
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`pt-5 ${styles.form}`}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className={styles.myInputClass}/>

      <label htmlFor="type">Car Type:</label>
      <input type="text" id="type" name="type" value={type} onChange={(e) => setType(e.target.value)} required className={styles.myInputClass} />

      <label htmlFor="capacity">Capacity:</label>
      <input type="number" id="capacity" name="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} required className={styles.myInputClass}/>

      <label htmlFor="passenger">Passengers:</label>
      <input type="number" id="passenger" name="passenger" value={passenger} onChange={(e) => setPassenger(e.target.value)} className={styles.myInputClass} />

      <label htmlFor="luggage">Luggages</label>
      <input type="number" id="luggage" name="luggage" value={luggage} onChange={(e) => setLuggage(e.target.value)} required className={styles.myInputClass} />

      <label htmlFor="amenities">Amenities</label>
      <input type="text" id="amenities" name="amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} required className={styles.myInputClass} />

      <label htmlFor="image">Upload Image</label>
      <input type="file" id="image" name="image" onChange={handleImageChange} required className={styles.myInputClass} />
      <button type="submit" className={styles.myButton}>Create Vehicle</button>
    </form>
  );
};

export default CreateVehicleForm;
