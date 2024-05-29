import React from 'react';
import styles from './about.module.css';
import Image from 'next/image';

const AboutUsComponent = () => {
    return (
        <div className='container mb-5'>
            <div className={`row ${styles.aboutUsContainer}`}>
                <div className="col-lg-6 col-md-12">
                    <h2 className={styles.customIconColor}>About Us</h2>
                    <p>Welcome to The Riders, your ultimate destination for everything related to riding and adventure. We are passionate about all things on two wheels and dedicated to bringing you the best experiences, stories, and resources from the world of motorcycling and biking.</p>
                    <p>Our mission is to inspire and connect riders from all walks of life. Whether you are a seasoned motorcyclist, a casual cyclist, or someone who simply loves the thrill of the ride, The Riders is here to fuel your passion and help you explore new horizons. We aim to create a vibrant community where riders can share their adventures, learn from one another, and celebrate the spirit of riding.</p>
                    <p>The Riders was founded by a group of enthusiasts who shared a common love for riding and adventure. Our journey began with a simple idea: to create a platform where riders could find reliable information, share their experiences, and connect with like-minded individuals. Over the years, we have grown into a diverse community of riders who come together to explore, discover, and celebrate the joy of riding.</p>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="row ">
                        <div className='col-md-5 mb-3'>
                            <Image src="/images/about-img-2.jpg" alt="Smaller Image" className={styles.smallerImage} width="100"
                                height={400}
                                layout="responsive"
                            />
                        </div>

                        <div className="col-md-7 mb-3">
                            <Image src="/images/about-us.jpg" alt="Smaller Image" className={styles.biggerImage} width="100"
                                height={400}
                                layout="responsive"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUsComponent;
