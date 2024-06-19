'use client'
import React, { useState } from 'react';

const CreateRideForm = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    dateTime: '',
    vehicleType: '',
    price: '',
    available: true, 
    image: null, 
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch('/api/ride', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Ride created successfully!');
        // Reset the form after successful submission
        setFormData({
          origin: '',
          destination: '',
          dateTime: '',
          vehicleType: '',
          price: '',
          available: true,
          image: null,
        });
      } else {
        console.error('Error creating ride:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating ride:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='text-center'><h3>Create A Ride</h3></div>
      <div className="form-group">
        <label htmlFor="origin">Origin:</label>
        <input
          type="text"
          id="origin"
          name="origin"
          value={formData.origin}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateTime">Date & Time:</label>
        <input
          type="datetime-local"
          id="dateTime"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="vehicleType">Vehicle Type:</label>
        <input
          type="text"
          id="vehicleType"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">Create Ride</button>
    </form>
  );
};

export default CreateRideForm;
