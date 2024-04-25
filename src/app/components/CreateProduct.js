import React from 'react';
import CreateProductForm from './CreateProductForm';

function CreateProduct() {
  // Define the handleProductSubmit function
  const handleProductSubmit = async (productData) => {
    try {
      // Send a POST request to your product creation API route (/api/products)
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful product creation (e.g., display success message)
        console.log('Product created successfully!');
      } else {
        // Handle potential errors during creation
        console.error('Error creating product:', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Log the type of onSubmit before passing it down
  console.log('Type of onSubmit in CreateProduct:', typeof handleProductSubmit);

  return (
    <div>
      <h1>Create Product</h1>
      {/* Pass handleProductSubmit as the onSubmit prop */}
      <CreateProductForm onSubmit={handleProductSubmit} />
    </div>
  );
}

export default CreateProduct;
