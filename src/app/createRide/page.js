'use client'
import { useState, useEffect } from 'react';
import CreateRideForm from "../components/rideComponent/CreateRideForm";

function Page() {
  // State to store ride details
  const [rideDetails, setRideDetails] = useState([]);

  // Fetch ride details from the API
  useEffect(() => {
    fetchRideDetails();
  }, []);

  // Function to fetch ride details
  const fetchRideDetails = async () => {
    try {
      const response = await fetch('/api/ride');
      if (!response.ok) {
        throw new Error('Failed to fetch ride details');
      }
      const data = await response.json();
      setRideDetails(data); // Assuming the API response is an array of ride details
    } catch (error) {
      console.error('Error fetching ride details:', error);
    }
  };

  return (
    <div className="container contact-text mt-5 mb-5">
      {/* Render the CreateRideForm component */}
      <CreateRideForm />

      {/* Render ride details */}
      <div className="mt-4">
        <h2>Ride Details</h2>
        <ul>
          {rideDetails.map((ride, index) => (
            <li key={index}>
              {/* Render details of each ride */}
              <p>{`Origin: ${ride.origin}`}</p>
              <p>{`Destination: ${ride.destination}`}</p>
              <img src={`/uploads/${ride.image}`} alt={`Ride Image ${index + 1}`} className="card-img-top" style={{ maxWidth: '300px' }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
