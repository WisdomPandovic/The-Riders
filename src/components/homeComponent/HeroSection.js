'use client'
import { useState } from 'react';
import BookingForm from './BookingForm'; 
import styles from "./home.module.css";
import backgroundImage from '../../images/pix2.jpg';

const HeroSection = () => {
  // const [showBookingForm, setShowBookingForm] = useState(false);

  // const toggleBookingForm = () => {
  //   setShowBookingForm(!showBookingForm);
  // };

  return (
    <div className={`${styles['hero-section']} text-center`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <h1 className="text-white">Welcome to Our Airport Ride Service</h1>
        <p className="text-white">Book your ride now and travel with comfort and convenience.</p>
        <button className={`btn btn-lg ${styles['custom-button']}`} > <a className="nav-link" href="/book-a-ride">Book a Ride</a></button>
        {/* {showBookingForm && 
          <div className="row justify-content-center mt-4">
            <div className="col-md-6">
              <BookingForm />
            </div>
          </div>
        } */}
      </div>
    </div>
  );
};

export default HeroSection;