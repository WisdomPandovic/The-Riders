import React from 'react';
import styles from './booking.module.css'; 
import backgroundImage from '../../images/pix2.jpg';

const BackgroundTextComponent = () => {
    return (
        <div className={`${styles['background-section']} text-center mt-5`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={`container text-white ${styles.textContainer}`}>
                <h2 className='l-spacing'>ARE YOU TRAVELING FOR WORK ?</h2>
                <p>Have any special request? We are always open to talk about opportunities and how we can help you.</p>
            </div>
        </div>
    );
}

export default BackgroundTextComponent;
