import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetLink, setResetLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/authens/forgetPassword', { email });
      console.log('Reset link sent:', response.data);
      setResetLink(response.data.resetLink);
      navigate('/reset-password');
    } catch (error) {
      console.error('Error sending reset link:', error);
    }
  };

  return (
    <div className="reset-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      {resetLink && (
        <div>
          <p>Reset link sent successfully! You can reset your password <a href={resetLink}>here</a>.</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
