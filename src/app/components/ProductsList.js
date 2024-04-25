'use client'
import React, { useState, useEffect } from 'react';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>Price: ${product.price}</span>
              {/* Optionally display image previews */}
              {product.images.length > 0 && (
                <div>
                  <h4>Images:</h4>
                  {product.images.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Product Image ${index + 1}`} style={{ width: '100px', marginRight: '10px' }} />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductsList;
