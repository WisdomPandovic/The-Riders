import React from 'react';
import styles from './about.module.css';

const StatisticsComponent = () => {
    // Sample data for statistics
    const statisticsData = [
        { count: 500, text: 'Booking Monthly' },
        { count: 10000, text: 'Visitor Daily' },
        { count: 95, text: 'Positive Feedback' },
        { count: 10, text: 'Award & Honours' }
    ];

    return (
        <div className='container mt-5 mb-5'>

            <div className={`row ${styles.statisticsContainer}`}>
                {statisticsData.map((data, index) => (
                    <div key={index} className={`col-md-3 ${styles.statistic}`}>
                        <div className={styles.count}>{data.count}+</div>
                        <div className={styles.text}>{data.text}</div>
                    </div>
                ))}
            </div>

            <div className='text-center pb-4 mt-5'>
                <h3 className={styles.count}>Our Clients</h3>
                <p className={styles.text}>Trusted by 5000+ of the world’s most customer-centric companies. Combines your communications <br></br>channels on one platform so you can streamline customer engagement.</p>

                <div className='row mt-5'>
                    <div className='col-lg-3 col-md-6'><img src="/images/partners-logo-2.png" alt="Client Logo" className={styles.clientLogo} /></div>
                    <div className='col-lg-3 col-md-6'><img src="/images/partners-logo-3.png" alt="Client" className={styles.clientLogo} /></div>
                    <div className='col-lg-3 col-md-6'><img src="/images/partners-logo-4.png" alt="Client" className={styles.clientLogo} /></div>
                    <div className='col-lg-3 col-md-6'><img src="/images/partners-logo-5.png" alt="Client" className={styles.clientLogo} /></div>
                </div>
            </div>
        </div>
    );
}

export default StatisticsComponent;
