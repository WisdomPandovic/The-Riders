import React from 'react';
import styles from './home.module.css';
import backgroundImage from '../../../images/pix2.jpg';

const BackgroundTextComponent = () => {
    return (
        <div className={`${styles['background-section']} text-center`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="container">
                <button className={`btn btn-lg ${styles['custom-button']}`} > <a className="nav-link" href="/become-a-chauffeur">Become a Chauffeur</a></button>
            </div>
        </div>
    );
}

export default BackgroundTextComponent;
