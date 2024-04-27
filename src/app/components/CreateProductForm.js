'use client'
import React, { useState } from 'react';

const CreateProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]); // State for selected image files

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    console.log('Input change:', name, value); // Log input changes

    // Log the file names
  if (name === 'images' && files) {
    console.log('Selected files:', files);
  }

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'images':
        setImages([...images, ...event.target.files]); // Store selected image files directly in state
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted!'); 
  
    // Ensure there's at least one image selected before submission
    if (images.length === 0) {
      alert('Please select at least one image.');
      return;
    }
  
    const formData = new FormData(); // Create FormData object
    
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
  
    // Append images with field names image1, image2, image3, image4
    images.slice(0, 4).forEach((file, index) => {
      formData.append(`images`, file); // Append each selected file to FormData
    });

     // Log the FormData object just before sending it to the server
  console.log('FormData:', formData);
  
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData, // Use FormData as body
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Product created successfully!', data);
        // Reset the form for a clean slate
        setName('');
        setDescription('');
        setPrice('');
        setImages([]);
      } else {
        console.error('Error creating product:', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  const renderImagePreviews = () => {
    // Ensure images is an array before calling map
    if (!Array.isArray(images)) return null;
    return images.map((file, index) => (
     <div> <img key={index} src={URL.createObjectURL(file)} alt={`Product Image ${index + 1}`} style={{ width: '100px', marginRight: '10px' }} /></div>
    ));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={name} onChange={handleInputChange} required /><br></br>

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={description} onChange={handleInputChange}></textarea><br></br>

      <label htmlFor="price">Price:</label>
      <input type="text" id="price" name="price" value={price} onChange={handleInputChange} required /><br></br>

      <label htmlFor="images">Images (up to 4):</label>
      <input type="file" id="images" name="images" multiple onChange={handleInputChange} accept="image/*" /><br></br>

      {/* Display image previews (optional) */}
      <div className='flex'>{renderImagePreviews()}</div>

      <button type="submit" disabled={images.length === 0}>
        Create Product
      </button>
    </form>
  );
};

export default CreateProductForm;
