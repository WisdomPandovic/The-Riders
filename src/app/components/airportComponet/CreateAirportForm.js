'use client'
import React, { useState } from 'react';
import styles from './airport.module.css';
import { toast } from 'react-toastify';

const CreateAirportForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [code, setCode] = useState('');
  const [facilities, setFacilities] = useState('');
  const [distanceFromCityCenter, setDistanceFromCityCenter] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted!');

    try {
      const response = await fetch('/api/airport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          location,
          code,
          facilities: facilities.split(',').map(facility => facility.trim()),
          distanceFromCityCenter: parseInt(distanceFromCityCenter),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Airport created successfully!', data);
        toast.success(data.message);
        setName('');
        setLocation('');
        setCode('');
        setFacilities('');
        setDistanceFromCityCenter('');
      } else {
        console.error('Error creating airport:', data.message);
        toast.error('Error creating airport:', data.message)
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Error:', error.message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required  className={styles.myInputClass}/>

      <label htmlFor="location">Location:</label>
      <input type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required className={styles.myInputClass} />

      <label htmlFor="code">Code:</label>
      <input type="text" id="code" name="code" value={code} onChange={(e) => setCode(e.target.value)} required className={styles.myInputClass}/>

      <label htmlFor="facilities">Facilities:</label>
      <input type="text" id="facilities" name="facilities" value={facilities} onChange={(e) => setFacilities(e.target.value)} className={styles.myInputClass} />

      <label htmlFor="distanceFromCityCenter">Distance From City Center:</label>
      <input type="number" id="distanceFromCityCenter" name="distanceFromCityCenter" value={distanceFromCityCenter} onChange={(e) => setDistanceFromCityCenter(e.target.value)} required className={styles.myInputClass} />

      <button type="submit" className={styles.myButton}>Create Airport</button>
    </form>
  );
};

export default CreateAirportForm;
