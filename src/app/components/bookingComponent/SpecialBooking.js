'use client'
import { useState, useEffect } from 'react';
import styles from "./booking.module.css";
import { toast } from 'react-toastify';

const SpecialBooking = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicle: '',
        airport: '',
        pickupLocation: '',
        dropOffLocation: '',
        flightNumber: '',
        pickupDate: '',
        pickupTime: '',
        durationInHours: 1,
        status: 'pending',
        requestType: 'special',
    });

    const [vehicles, setVehicles] = useState([]);
    const [airports, setAirports] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            console.log(isLoggedIn)
        };

        checkLoggedIn();
    }, []);

    useEffect(() => {
        // Perform actions that rely on the user being logged in
        console.log('User is logged in:', isLoggedIn);
        // You can also fetch data or perform other operations here
    }, [isLoggedIn]);
    

    useEffect(() => {
        // Fetch vehicle data from the backend API
        fetch('/api/vehicle')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setVehicles(data);
                } else {
                    console.error('Invalid vehicle data:', data);
                }
            })
            .catch(error => console.error('Error fetching vehicles:', error));

        // Fetch airport data from the backend API
        fetch('/api/airport')
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.airports)) {
                    setAirports(data.airports);
                } else {
                    console.error('Invalid airport data:', data);
                }
            })
            .catch(error => console.error('Error fetching airports:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            // Display message prompting user to sign up
            toast.error('You must be a member to book a ride. Please sign up.');
            return;
        }
        
        console.log('Form submitted with data:', formData);

        try {
            const response = await fetch('/api/specialRequestBooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create booking');
            }

            const data = await response.json();
            console.log(data)
            console.log('Booking created successfully:', data);
            toast.success('Booking created successfully');
            toast.info('Booking created successfully. You will receive a confirmation message via email shortly.');
            setFormData({ name: '', email: '', phone: '', vehicle: '', airport: '', pickupLocation: '', dropOffLocation: '', flightNumber: '', pickupDate: '', pickupTime: '', durationInHours: '' });
        } catch (error) {
            console.error('Error creating booking:', error.message);
            toast.error('Error creating booking:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.bookingForm}>
            <div className={styles.inputWrapper}>

                <div className="form-group">
                    <label>Duration (in hours)</label>
                    <select
                        id="durationInHours"
                        name="durationInHours"
                        value={formData.durationInHours}
                        onChange={handleChange}
                        required
                        className={styles.myInputClass}
                    >
                        {[...Array(24).keys()].map(hour => (
                            <option key={hour + 1} value={hour + 1}>{hour + 1} hour{hour !== 0 ? 's' : ''}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Request Type</label>
                    <select
                        id="requestType"
                        name="requestType"
                        value={formData.requestType}
                        onChange={handleChange}
                        required
                        className={styles.myInputClass}
                    >
                        <option value="special">Special Request</option>
                        <option value="regular">Regular Booking</option>
                    </select>
                </div>
            </div>

            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className={styles.myInputClass}
                />
            </div>

            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className={styles.myInputClass}
                />

                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                    className={styles.myInputClass}
                />
            </div>

            <div className={styles.inputWrapper}>
                <select
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    required
                    className={styles.myInputClass}
                >
                    <option value="">Select Vehicle</option>
                    {vehicles && vehicles.map(vehicle => (
                        <option key={vehicle._id} value={vehicle._id}>{vehicle.name}</option>
                    ))}
                </select>

                <select
                    id="airport"
                    name="airport"
                    value={formData.airport}
                    onChange={handleChange}
                    className={styles.myInputClass}
                >
                    <option value="">Select Airport</option>
                    {airports.map(airport => (
                        <option key={airport._id} value={airport._id}>{airport.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    id="pickupLocation"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    required
                    className={styles.myInputClass}
                />

                <input
                    type="text"
                    id="dropOffLocation"
                    name="dropOffLocation"
                    value={formData.dropOffLocation}
                    onChange={handleChange}
                    placeholder="Enter drop-off location"
                    required
                    className={styles.myInputClass}
                />
            </div>

            <div className={styles.inputWrapper}>
                <div>
                    <label>Pick-Up Date</label>
                    <input
                        type="date"
                        id="pickupDate"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                        required
                        className={styles.myInputClass}
                    />
                </div>
                <div>
                    <label>Pick-Up Time</label>
                    <input
                        type="time"
                        id="pickupTime"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleChange}
                        required
                        className={styles.myInputClass}
                    />
                </div>
            </div>

            <div className="form-group">
                <input
                    type="text"
                    id="flightNumber"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    placeholder="Enter flight number (optional)"
                    className={styles.myInputClass}
                />
            </div>

            {/* Status (Hidden input, default is 'pending') */}
            <input
                type="hidden"
                id="status"
                name="status"
                value={formData.status}
            />

            <button type="submit" className={styles.myButton}>Request Now</button>
        </form>
    );
};

export default SpecialBooking;
