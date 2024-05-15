import { useState, useEffect } from 'react';
import styles from "./home.module.css";

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicle: '',
        airport: '',
        pickupLocation: '',
        dropOffLocation: '',
        flightNumber: '',
        status: 'pending',
    });

    const [vehicles, setVehicles] = useState([]);
    const [airports, setAirports] = useState([]);

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
        console.log('Form submitted with data:', formData);

        try {
            const response = await fetch('/api/booking', {
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
            console.log('Booking created successfully:', data);
        } catch (error) {
            console.error('Error creating booking:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.bookingForm}>
            <div className="form-group">
                <label htmlFor="user">User:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="vehicle">Select Vehicle:</label>
                <select
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    required
                    className="form-control"
                >
                    <option value="">Select Vehicle</option>
                    {vehicles && vehicles.map(vehicle => (
                        <option key={vehicle._id} value={vehicle._id}>{vehicle.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="airport">Select Airport:</label>
                <select
                    id="airport"
                    name="airport"
                    value={formData.airport}
                    onChange={handleChange}
                    required
                    className="form-control"
                >
                    <option value="">Select Airport</option>
                    {airports.map(airport => (
                        <option key={airport._id} value={airport._id}>{airport.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="pickupLocation">Pickup Location:</label>
                <input
                    type="text"
                    id="pickupLocation"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    required
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="dropOffLocation">Drop-off Location:</label>
                <input
                    type="text"
                    id="dropOffLocation"
                    name="dropOffLocation"
                    value={formData.dropOffLocation}
                    onChange={handleChange}
                    placeholder="Enter drop-off location"
                    required
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="flightNumber">Flight Number (Optional):</label>
                <input
                    type="text"
                    id="flightNumber"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    placeholder="Enter flight number (optional)"
                    className="form-control"
                />
            </div>

            {/* Status (Hidden input, default is 'pending') */}
            <input
                type="hidden"
                id="status"
                name="status"
                value={formData.status}
            />

            <button type="submit" className="btn btn-primary">Request Now</button>
        </form>
    );
};

export default BookingForm;
