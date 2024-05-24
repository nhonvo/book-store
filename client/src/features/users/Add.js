import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Add = ({ users, setUsers, setIsAdding }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleAdd = async (e) => {
    //    e.preventDefault();

    if (!userName || !email || !password || !role) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    try {
      console.log(role);
      const response = await axios.post('http://localhost:3000/users', {
        userName,
        email,
        password,
        role,
      });

      const newUser = response.data;
      setUsers([...users, newUser]);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${userName}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });

      setIsAdding(false);
    } catch (error) {
      console.error('Error adding user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while adding the user.',
        showConfirmButton: true,
      });
    }
  };
  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add User</h1>
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
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
