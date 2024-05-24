import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Edit = ({ selectedUser, setIsEditing }) => {
  const id = selectedUser._id;

  const [userName, setUserName] = useState(selectedUser.userName);
  const [email, setEmail] = useState(selectedUser.email);
  // const [password, setPassword] = useState('');
  const [role, setRole] = useState(selectedUser.role);

  const handleUpdate = async (e) => {
    //    e.preventDefault();

    if (!userName || !email) {

      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    try {
      const response = await axios.put(`http://localhost:3000/users/${id}`, {
        userName,
        email,
        // password,
        role,
      });

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${response.data.data.userName}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update user.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit User</h1>
        <label htmlFor="userName">User Name</label>
        <input
          id="userName"
          type="text"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="publisher">Publisher</option>
        </select>
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
