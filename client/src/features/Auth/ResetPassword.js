import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/authens/resetPassword/${token}`, { password });
      console.log('Password reset successful:', response.data);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="token">Token:</label>
          <input type="text" id="token" value={token} onChange={(e) => setToken(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {errorMessage && (
          <div>
            <p>{errorMessage}</p>
          </div>
        )}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
