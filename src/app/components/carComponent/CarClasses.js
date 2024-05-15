'use client'
import styles from './car.module.css';
import { FaUsers, FaSuitcase } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function CarClasses() {

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        // Fetch vehicle data of type "First class" from the API
        fetch('/api/vehicle?type=First class')
            .then(response => response.json())
            .then(data => {
                setVehicles(data);
            })
            .catch(error => console.error('Error fetching vehicle data:', error));
    }, []);

    return (
        <div>
            <div className="container mt-5 mb-5 ">
                <h2 className={styles.customIconColor}>Our Core Classes</h2>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <img src="/images/comfort.jpg" alt="Service 1" className={styles.carImage} />
                        <p className={`mt-2 ${styles.ourClass} mb-0 `}>Comfort Class</p>
                        <p className={styles.customColorGray}>Lexus ES 350 or Ford Taurus</p>

                        <div className='d-flex '>
                            <div className='d-flex align-items-center'>
                                <FaUsers className={`${styles.grayDark} mr-2`} />
                                <p className={`${styles.grayDark} mb-0 ms-2`}>Passengers 3</p>
                            </div>

                            <div className='d-flex align-items-center ms-5'>
                                <FaSuitcase className={`${styles.grayDark} mr-2`} />
                                <p className={`${styles.custom} mb-0 ms-2`}>Luggage × 2</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img src="/images/first.jpg" alt="Service 2" className={styles.carImage} />
                        <p className={`mt-2 ${styles.grayDark}`}>First class</p>
                        <p className={styles.customColorGray}>Mercedes Benz S-Сlass</p>

                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <FaUsers className={`${styles.grayDark} mr-2`} />
                                <p className={`${styles.grayDark} mb-0 ms-2`}>Passengers 3</p>
                            </div>

                            <div className='d-flex align-items-center'>
                                <FaSuitcase className={`${styles.grayDark} mr-2`} />
                                <p className={`${styles.grayDark} mb-0 ms-2`}>Luggage × 2</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img src="/images/comfort-van.jpg" alt="Service 3" className={styles.carImage} />
                        <p className={`mt-2 ${styles.grayDark}`}>Comfort VAN class</p>
                        <p className={styles.customColorGray}>Chevrolet Tahoe</p>

                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <FaUsers className={`${styles.grayDark} mr-2`} />
                                <p className={`${styles.grayDark} mb-0 ms-2`}>Passengers 6</p>
                            </div>

                            <div className='d-flex align-items-center'>
                                <FaSuitcase className={`${styles.grayDark} mr-2`} />
                                <p className={`${styles.grayDark} mb-0 ms-2`}>Luggage × 4</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className={`mt-5 ${styles.customColorGray}`}>Other Classes</h2>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <img src="/images/comfort.jpg" alt="Service 1" className={styles.carImage} />
                        <p className={`mt-2 ${styles.grayDark}`}>Business class</p>
                        <p className={styles.customColorGray}>Mercedes-Benz E-class</p>

                        <div className='d-flex'>
                            <div className='d-flex align-items-center'>
                                <FaUsers className={`${styles.customIconColor} mr-2`} />
                                <p className={`${styles.customIconColor} mb-0 ms-2`}>Passengers 3</p>
                            </div>

                            <div className='d-flex align-items-center ms-5'>
                                <FaSuitcase className={`${styles.customIconColor} mr-2`} />
                                <p className={`${styles.customIconColor} mb-0 ms-2`}>Luggage × 2</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img src="/images/first.jpg" alt="Service 2" className={styles.carImage} />
                        <p className={`mt-2 ${styles.grayDark}`}>Mini VAN class</p>
                        <p className={styles.customColorGray}>Mercedes-Benz Vito</p>

                        <div className='d-flex '>
                            <div className='d-flex align-items-center'>
                                <FaUsers className={`${styles.customIconColor} mr-2`} />
                                <p className={`${styles.customIconColor} mb-0 ms-2`}>Passengers 6</p>
                            </div>

                            <div className='d-flex align-items-center ms-5'>
                                <FaSuitcase className={`${styles.customIconColor} mr-2`} />
                                <p className={`${styles.customIconColor} mb-0 ms-2`}>Luggage × 4</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img src="/images/comfort-van.jpg" alt="Service 3" className={styles.carImage} />
                        <p className={`mt-2 ${styles.grayDark}`}>VIP VAN class</p>
                        <p className={styles.customColorGray}>Mercedes-Benz Sprinter</p>

                        <div className='d-flex '>
                            <div className='d-flex align-items-center'>
                                <FaUsers className={`${styles.customIconColor} mr-2`} />
                                <p className={`${styles.customIconColor} mb-0 ms-2`}>Passengers 12</p>
                            </div>

                            <div className='d-flex align-items-center ms-5'>
                                <FaSuitcase className={`${styles.customIconColor} mr-2`} />
                                <p className={`${styles.customIconColor} mb-0 ms-2`}>Luggage × 4</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <h2 className={styles.customIconColor}>Our First Classes</h2>
                <div className="row mt-4">
                    {vehicles.map(vehicle => (
                        <div className="col-md-4" key={vehicle._id}>
                            <img src={`/uploads/${vehicle.image}`} alt={vehicle.name} className={styles.carImage} />
                            <p className={styles.customColorGray}>{vehicle.type}</p>
                            <p className={`mt-2 ${styles.ourClass} mb-0`}>{vehicle.name}</p>


                            <div className='d-flex mt-3'>
                                <div className='d-flex align-items-center'>
                                    <FaUsers className={`${styles.grayDark} mr-2`} />
                                    <p className={`${styles.grayDark} mb-0 ms-2`}>Passengers {vehicle.passenger}</p>
                                </div>

                                <div className='d-flex align-items-center ms-5'>
                                    <FaSuitcase className={`${styles.grayDark} mr-2`} />
                                    <p className={`${styles.custom} mb-0 ms-2`}>Luggage × {vehicle.luggage}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default CarClasses;