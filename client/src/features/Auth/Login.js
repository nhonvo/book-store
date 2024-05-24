import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const navigate = useNavigate(); // Initialize useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/authens/login', formData);
      console.log('Login successful:', response.data);
      // Save token to session storage
      const token = response.data.data;
      console.log(token);
      sessionStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='reset-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Username:</label>
          <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="additional-options">
        <p>Don't have an account? <a href="/register">Register</a></p>
        <p>Forgot your password? <a href="/forgot-password">Forgot Password</a></p>
      </div>
    </div>

  );
};

export default Login;
