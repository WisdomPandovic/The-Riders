'use client'
import { useState } from 'react';
import styles from "./contact.module.css";
import backgroundImage from '../../images/pix2.jpg';

const HeroSection = () => {

  return (
    <div className={`${styles['hero-section']} text-center`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <h1 className="text-white text-uppercase l-spacing">Welcome to Our Contact Section</h1>
      </div>
    </div>
  );
};

export default HeroSection;