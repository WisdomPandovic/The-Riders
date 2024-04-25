// 'use client'
// import React, { useState } from 'react';

// const CreateProductForm = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [images, setImages] = useState([]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     switch (name) {
//       case 'name':
//         setName(value);
//         break;
//       case 'description':
//         setDescription(value);
//         break;
//       case 'price':
//         setPrice(value);
//         break;
//       case 'images':
//         setImages(Array.from(event.target.files));
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const productData = { name, description, price, images };
//     try {
//       // Send a POST request to your product creation API route (/api/products)
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(productData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Handle successful product creation (e.g., display success message)
//         console.log('Product created successfully!');
//       } else {
//         // Handle potential errors during creation
//         console.error('Error creating product:', data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }

//     // Reset form fields after submission
//     setName('');
//     setDescription('');
//     setPrice('');
//     setImages([]);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="name">Name:</label>
//       <input type="text" id="name" name="name" value={name} onChange={handleInputChange} required />

//       <label htmlFor="description">Description:</label>
//       <textarea id="description" name="description" value={description} onChange={handleInputChange}></textarea>

//       <label htmlFor="price">Price:</label>
//       <input type="text" id="price" name="price" value={price} onChange={handleInputChange} required />

//       <label htmlFor="images">Images:</label>
//       <input type="file" id="images" name="images" multiple onChange={handleInputChange} />

//       <button type="submit">Create Product</button>
//     </form>
//   );
// };

// export default CreateProductForm;

'use client'
// import React, { useState } from 'react';

// const CreateProductForm = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [images, setImages] = useState([]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     switch (name) {
//       case 'name':
//         setName(value);
//         break;
//       case 'description':
//         setDescription(value);
//         break;
//       case 'price':
//         setPrice(value);
//         break;
//       case 'images':
//         // Extract individual image URLs
//         const imageUrls = [];
//         for (let i = 0; i < event.target.files.length; i++) {
//           const file = event.target.files[i];
//           imageUrls.push(URL.createObjectURL(file));
//         }
//         setImages(imageUrls);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const productData = { name, description, price, images };

//     try {
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(productData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Handle successful product creation (e.g., display success message)
//         console.log('Product created successfully!', data);
//         // Reset the form for a clean slate
//         setName('');
//         setDescription('');
//         setPrice('');
//         setImages([]);
//       } else {
//         // Handle potential errors during creation
//         console.error('Error creating product:', data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="name">Name:</label>
//       <input type="text" id="name" name="name" value={name} onChange={handleInputChange} required />

//       <label htmlFor="description">Description:</label>
//       <textarea id="description" name="description" value={description} onChange={handleInputChange}></textarea>

//       <label htmlFor="price">Price:</label>
//       <input type="text" id="price" name="price" value={price} onChange={handleInputChange} required />

//       <label htmlFor="images">Images:</label>
//       <input type="file" id="images" name="images" multiple onChange={handleInputChange} />

//       <button type="submit">Create Product</button>
//     </form>
//   );
// };

// export default CreateProductForm;


// import React, { useState } from 'react';

// const CreateProductForm = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [images, setImages] = useState([]); // State for image URLs (limit 4)

//   const MAX_IMAGE_COUNT = 4;

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     switch (name) {
//       case 'name':
//         setName(value);
//         break;
//       case 'description':
//         setDescription(value);
//         break;
//       case 'price':
//         setPrice(value);
//         break;
//       case 'images':
//         // Extract and limit image URLs
//         const newImages = [];
//         for (let i = 0; i < event.target.files.length && newImages.length < MAX_IMAGE_COUNT; i++) {
//           const file = event.target.files[i];
//           newImages.push(URL.createObjectURL(file));
//         }
//         setImages(newImages);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Ensure there's at least one image selected before submission
//     if (images.length === 0) {
//       alert('Please select at least one image.');
//       return;
//     }

//     const productData = { name, description, price, images };

//     try {
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(productData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Handle successful product creation (e.g., display success message)
//         console.log('Product created successfully!', data);
//         // Reset the form for a clean slate
//         setName('');
//         setDescription('');
//         setPrice('');
//         setImages([]);
//       } else {
//         // Handle potential errors during creation
//         console.error('Error creating product:', data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   const renderImagePreviews = () => {
//     return images.map((imageUrl, index) => (
//       <img key={index} src={imageUrl} alt={`Product Image ${index + 1}`} style={{ width: '100px', marginRight: '10px' }} />
//     ));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="name">Name:</label>
//       <input type="text" id="name" name="name" value={name} onChange={handleInputChange} required />

//       <label htmlFor="description">Description:</label>
//       <textarea id="description" name="description" value={description} onChange={handleInputChange}></textarea>

//       <label htmlFor="price">Price:</label>
//       <input type="text" id="price" name="price" value={price} onChange={handleInputChange} required />

//       <label htmlFor="images">Images (up to 4):</label>
//       <input type="file" id="images" name="images" multiple onChange={handleInputChange} accept="image/*" />

//       {/* Display image previews (optional) */}
//       {images.length > 0 && (
//         <div>
//           <h4>Selected Images:</h4>
//           {renderImagePreviews()}
//         </div>
//       )}

//       <button type="submit" disabled={images.length === 0}>
//         Create Product
//       </button>
//     </form>
//   );
// };

// export default CreateProductForm;





import React, { useState } from 'react';

const CreateProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]); // State for selected image files

  const MAX_IMAGE_COUNT = 4;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
    // Ensure there's at least one image selected before submission
    if (images.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    const formData = new FormData(); // Create FormData object
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    images.forEach((file, index) => {
      formData.append(`image${index + 1}`, file); // Append each selected file to FormData
    });

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
      <img key={index} src={URL.createObjectURL(file)} alt={`Product Image ${index + 1}`} style={{ width: '100px', marginRight: '10px' }} />
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={name} onChange={handleInputChange} required />

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={description} onChange={handleInputChange}></textarea>

      <label htmlFor="price">Price:</label>
      <input type="text" id="price" name="price" value={price} onChange={handleInputChange} required />

      <label htmlFor="images">Images (up to 4):</label>
      <input type="file" id="images" name="images" multiple onChange={handleInputChange} accept="image/*" />

      {/* Display image previews (optional) */}
      {images.length > 0 && (
        <div>
          <h4>Selected Images:</h4>
          {renderImagePreviews()}
        </div>
      )}

      <button type="submit" disabled={images.length === 0}>
        Create Product
      </button>
    </form>
  );
};

export default CreateProductForm;
