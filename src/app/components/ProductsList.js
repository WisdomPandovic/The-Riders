"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='width80'>
      <h3 className="table-header">All products</h3>
      {products.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  {product.images.length > 0 && (
                    <div className="image-container">
                      {product.images.map((imageFilename, index) => (
                        <img
                          key={index}
                          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${imageFilename}`}
                          alt={`Product Image ${index + 1}`}
                          className="product-image"
                        />
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductsList;
