import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Get token from session storage
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                // Add token to axios headers
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Fetch profile data
                const response = await axios.get('http://localhost:3000/authens/me');
                setProfileData(response.data.done);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {error && <div className="error-message">{error}</div>}
            {profileData && (
                <div className="profile-details">
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Username:</strong> {profileData.userName}</p>
                </div>
            )}
        </div>
    );
}

export default Profile;
