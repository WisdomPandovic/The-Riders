'use client'
import styles from "./about.module.css";
import backgroundImage from '../../images/pix2.jpg';

function AboutHero() {
    return (
        <div className={`${styles['hero-section']} text-center mb-5`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="container">
                <h1 className="text-white text-uppercase l-spacing">ABOUT</h1>
                <p className="text-white">We thrive to deliver the most comfort and luxurious experience, <br></br> by handling all your trip details and provide  the best fleet and chauffeurs</p>
            </div>
        </div>
    );
}
export default AboutHero;