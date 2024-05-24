import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        role: 'admin' // Assuming default role is admin
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/authens/register', formData);
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };


    return (
        <div className="reset-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <div className="additional-options">
                <p>Already have an account? <a href="/login">Login</a></p>
                <p>Forgot your password? <a href="/forgot-password">Reset Password</a></p>
            </div>
        </div>
    );
};

export default Register;
