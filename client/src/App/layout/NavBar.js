import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const handleLogout = async () => {
        try {
            // Send request to logout endpoint
            await axios.get('http://localhost:3000/authens/logout');
            sessionStorage.removeItem('token');
            // Redirect to login page after logout
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/"><img src="assets/logo.png" alt="App Logo" /></Link>
                </div>
                <ul className="nav-links">
                    <li><Link to="/" className="link">Home</Link></li>
                    <li><Link to="/user" className="link">User</Link></li>
                    <li><Link to="/book" className="link">Book</Link></li>
                    <li><Link to="/author" className="link">Author</Link></li>
                    <li><Link to="/publisher" className="link">Publisher</Link></li>
                </ul>
                <div className="user-logo" onClick={toggleDropdown}>
                    <img src="assets/user.png" alt="User Logo" />
                    {dropdownOpen && (

                        <div className="dropdown">
                            <Link to="/Profile" className="dropdown-item">Profile</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;
