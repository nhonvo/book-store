import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldpassword: '',
    newPassword: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/authens/changePassword', formData);
      console.log('Password changed successfully:', response.data);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      console.error('Error changing password:', error.response.data);
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="reset-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} id="changePasswordForm">
        <div className="form-group">
          <label htmlFor="oldpassword">Old Password:</label>
          <input type="password" id="oldpassword" name="oldpassword" value={formData.oldpassword} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {successMessage && (
        <div>
          <p>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
