'use client'
import CreateVehicleForm from "../../../components/vehicleComponent/CreateVehicleForm";
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RotatingLines } from 'react-loader-spinner';

function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You need to login to access this page.');
            router.push('/users/sign-in');
            return;
        }

        try {
            // Decode token to get user information
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);
            const currentTime = Date.now() / 1000;

            // Check if the token is expired
            if (decodedToken.exp < currentTime) {
                toast.error('Session expired. Please login again.');
                localStorage.removeItem('token'); // Clear the expired token
                router.push('/users/sign-in');
                return;
            }

            // Check if user has admin role
            if (decodedToken.role === 'Admin') {
                // Continue with any necessary initialization or data fetching
            } else {
                toast.error('You do not have permission to access this page.');
                router.push('/home');
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            toast.error('Failed to decode token.');
        }
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="text-center pt-5">
                <h3>Admin Only</h3>
                <p className="customIconColor ">Create Vehicle</p>
            </div>
            {isLoading ? (
                <div className="text-center">
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                    />
                </div>
            ) : (
                <CreateVehicleForm />
            )}
        </div>
    )
}
export default Page;