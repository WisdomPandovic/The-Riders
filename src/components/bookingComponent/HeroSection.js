'use client'
import { useState } from 'react';
import styles from "./booking.module.css";
import backgroundImage from '../../images/pix2.jpg';
import { FaPhone } from 'react-icons/fa';

const HeroSection = () => {
  const phoneNumber = "+1234567890";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`; // Initiate a phone call when the button is clicked
  };

  return (
    <div className={`${styles['hero-section']} text-center`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <h1 className="text-white text-uppercase l-spacing">Book A Ride</h1>

        <button className={`btn btn-lg ${styles['custom-button']}`} onClick={handleCall}>
          <FaPhone /> Call Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
