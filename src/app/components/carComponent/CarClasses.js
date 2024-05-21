'use client'
import styles from './car.module.css';
import { FaUsers, FaSuitcase } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function CarClasses() {

    const [vehicles, setVehicles] = useState([]);
    const [executives, setExecutive] = useState([]);
    const [suvs, setSuv] = useState([]);
    const [van, setVan] = useState([]);

    useEffect(() => {
        // Fetch vehicle data from the API
        fetch('/api/vehicle')
            .then(response => response.json())
            .then(data => {
                // Filter vehicles based on type
                const firstClassVehicles = data.filter(vehicle => vehicle.type === "First class");
                const executiveClassVehicles = data.filter(vehicle => vehicle.type === "Executive Class");
                const suvClassVehicles = data.filter(vehicle => vehicle.type === "SUV Class");
                const vanClassVehicles = data.filter(vehicle => vehicle.type === "VAN");
                // Set state for each type of vehicles
                setVehicles(firstClassVehicles);
                setExecutive(executiveClassVehicles);
                setSuv(suvClassVehicles);
                setVan(vanClassVehicles);
            })
            .catch(error => console.error('Error fetching vehicle data:', error));
    }, []);

    return (
        <div>
            <div className="container mt-5 mb-5 ">
                {/* <h2 className={styles.customIconColor}>Our Core Classes</h2>
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
                </div> */}

                {/* <h2 className={`mt-5 ${styles.customColorGray}`}>Other Classes</h2>
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
                </div> */}
            </div>

            <div className="container mt-5 mb-5">
                <h2 className={styles.customIconColor}>Our First Classes</h2>
                <div className="row mt-4">
                    {vehicles.map(vehicle => (
                        <div className="col-lg-4 col-md-6" key={vehicle._id}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={`/uploads/${vehicle.image}`}
                                    alt={vehicle.name}
                                    layout="responsive"
                                    width={400}
                                    height={300}
                                    className={styles.carImage}
                                />
                            </div>
                            {/* <p className={styles.customColorGray}>{vehicle.type}</p> */}
                            <p className={`mt-2 ${styles.ourClass} mb-0`}>{vehicle.name}</p>
                            <div className='d-flex mt-3'>
                                <div className='d-flex align-items-center'>
                                    <FaUsers className={`${styles.grayDark} mr-2`} />
                                    <p className={`${styles.grayDark} mb-0 ms-2`}>{vehicle.passenger}</p>
                                </div>
                                <div className='d-flex align-items-center ms-5'>
                                    <FaSuitcase className={`${styles.grayDark} mr-2`} />
                                    <p className={`${styles.custom} mb-0 ms-2`}>× {vehicle.luggage}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <h2 className={styles.customIconColor}>Executive Classes</h2>
                <div className="row mt-4">
                    {executives.map(executive => (
                        <div className="col-lg-4 col-md-6" key={executive._id}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={`/uploads/${executive.image}`}
                                    alt={executive.name}
                                    layout="responsive"
                                    width={400}
                                    height={300}
                                    className={styles.carImage}
                                />
                            </div>
                            {/* <p className={styles.customColorGray}>{executive.type}</p> */}
                            <p className={`mt-2 ${styles.ourClass} mb-0`}>{executive.name}</p>
                            <div className='d-flex mt-3'>
                                <div className='d-flex align-items-center'>
                                    <FaUsers className={`${styles.grayDark} mr-2`} />
                                    <p className={`${styles.grayDark} mb-0 ms-2`}>{executive.passenger}</p>
                                </div>
                                <div className='d-flex align-items-center ms-5'>
                                    <FaSuitcase className={`${styles.grayDark} mr-2`} />
                                    <p className={`${styles.custom} mb-0 ms-2`}>× {executive.luggage}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <h2 className={styles.customIconColor}>Suv Classes</h2>
                <div className="row mt-4">
                    {suvs.map(suv => (
                        <div className="col-lg-4 col-md-6" key={suv._id}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={`/uploads/${suv.image}`}
                                    alt={suv.name}
                                    layout="responsive"
                                    width={400}
                                    height={300}
                                    className={styles.carImage}
                                />
                            </div>
                            {/* <p className={styles.customColorGray}>{suv.type}</p> */}
                            <p className={`mt-2 ${styles.ourClass} mb-0`}>{suv.name}</p>
                            <div className='d-flex mt-3'>
                                <div className='d-flex align-items-center'>
                                    <FaUsers className={`${styles.grayDark} mr-2`} />
                                    <p className={`${styles.grayDark} mb-0 ms-2`}>{suv.passenger}</p>
                                </div>
                                <div className='d-flex align-items-center ms-5'>
                                    <FaSuitcase className={`${styles.grayDark} mr-2`} />
                                    <p className={`${styles.custom} mb-0 ms-2`}> × {suv.luggage}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <h2 className={styles.customIconColor}>Van Classes</h2>
                <div className="row mt-4">
                    {van.map(suv => (
                        <div className="col-lg-4 col-md-6" key={suv._id}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={`/uploads/${suv.image}`}
                                    alt={suv.name}
                                    layout="responsive"
                                    width={400}
                                    height={300}
                                    className={styles.carImage}
                                />
                            </div>
                            {/* <p className={styles.customColorGray}>{suv.type}</p> */}
                            <p className={`mt-2 ${styles.ourClass} mb-0`}>{suv.name}</p>
                            <div className='d-flex mt-3'>
                                <div className='d-flex align-items-center'>
                                    <FaUsers className={`${styles.grayDark} mr-2`} />
                                    <p className={`${styles.grayDark} mb-0 ms-2`}>{suv.passenger}</p>
                                </div>
                                <div className='d-flex align-items-center ms-5'>
                                    <FaSuitcase className={`${styles.grayDark} mr-2`} />
                                    <p className={`${styles.custom} mb-0 ms-2`}> × {suv.luggage}</p>
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