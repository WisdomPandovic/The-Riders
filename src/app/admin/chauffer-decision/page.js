'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
// import DataTable from 'react-data-table-component';
import { jwtDecode } from 'jwt-decode';
import { RotatingLines } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

// Dynamically import DataTable to ensure it's only loaded on the client side
const DataTable = dynamic(() => import('react-data-table-component'), { ssr: false });

function Page() {
    const [chauffeurs, setChauffeurs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Handle case where token is not found (user not logged in)
            toast.error('You need to login to access this page.');
            router.push('/users/sign-in');
            return;
        }

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

        // Check if user has admin role (example assumes 'admin' role exists in JWT payload)
        if (!decodedToken.role.includes('Admin')) {
            toast.error('You do not have permission to access this page.');
            // Redirect or handle unauthorized access
            return;
        }

        const fetchChauffeurs = async () => {
            try {
                const response = await fetch('/api/chauffeurApplication', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in headers for authentication
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setChauffeurs(data);
            } catch (error) {
                console.error('Error fetching chauffeurs:', error);
                toast.error('Failed to fetch chauffeurs data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchChauffeurs();
    }, []);

    const submitDecision = async (userId, decision) => {
        console.log('Submitting decision with userId:', userId);
        console.log('Decision:', decision);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/chauffeurApplication', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId, decision }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit decision');
            }

            updateChauffeurStatus(userId, decision);
            toast.success(`User ${decision} email sent successfully`);
        } catch (error) {
            console.error('Error submitting decision:', error);
            toast.error('Failed to submit decision');
        }
    };

    const updateChauffeurStatus = (userId, status) => {
        setChauffeurs(
            chauffeurs.map((chauffeur) =>
                chauffeur._id === userId ? { ...chauffeur, status } : chauffeur
            )
        );
    };

    const customButtonStyles = {
        width: '80px',
        height: '30px',
        marginRight: '5px',
    };

    const handleSearch = (event) => {
        setFilterText(event.target.value);
    };

    const filteredChauffeurs = chauffeurs.filter((chauffeur) =>
        chauffeur.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const columns = [
        { name: '#', selector: (row, index) => index + 1 },
        { name: 'Name', selector: (row) => row.name },
        { name: 'Email', selector: (row) => row.email },
        { name: 'Phone', selector: (row) => row.phone },
        { name: 'Address', selector: (row) => row.address },
        { name: 'City', selector: (row) => row.city },
        { name: 'State', selector: (row) => row.state },
        { name: 'Zip Code', selector: (row) => row.zipCode },
        { name: 'Years of Experience', selector: (row) => row.yearsOfExperience },
        { name: 'Availability', selector: (row) => row.availability },
        { name: 'Status', selector: (row) => row.status },
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <button
                        className="btn btn-success btn-sm"
                        style={customButtonStyles}
                        onClick={() => submitDecision(row._id, 'accepted')}
                    >
                        Accept
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        style={customButtonStyles}
                        onClick={() => submitDecision(row._id, 'rejected')}
                    >
                        Reject
                    </button>
                </>
            ),
            button: true,
            ignoreRowClick: true,
            allowOverflow: true,
            wrap: true,
        },
    ];

    return (
        <div className="container mt-5">
            <div className="text-center pt-3 pb-5">
                <h3>Admin Only</h3>
                <p className="customIconColor">Chauffeur Applications</p>
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
            ) : chauffeurs.length === 0 ? (
                <div className="text-center">No chauffeur applications found.</div>
            ) : (
                <DataTable
                    columns={columns}
                    data={filteredChauffeurs}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    noHeader
                    subHeader
                    subHeaderComponent={
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={filterText}
                            onChange={handleSearch}
                            className="form-control form-control-sm"
                        />
                    }
                />
            )}
        </div>
    );
}

export default Page;
