import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';


const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/?limit=100&page=1');
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = id => {
        const [user] = users.filter(user => user._id === id);
        setSelectedUser(user);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.value) {
                axios.delete(`http://localhost:3000/users/${id}`)
                    .then((response) => {
                        const deletedUser = response.data;
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: `Data has been deleted.`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));


                    })
                    .catch((error) => {
                        console.error('Error deleting user:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to delete user. Please try again later.',
                            showConfirmButton: true,
                        });
                    });
            }
        });
    };

    return (
        <div className="container">
            {!isAdding && !isEditing && (
                <>
                    <Header
                        setIsAdding={setIsAdding}
                    />
                    <Table
                        users={users}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {isAdding && (
                <Add
                    users={users}
                    setUsers={setUsers}
                    setIsAdding={setIsAdding}
                />
            )}
            {isEditing && (
                <Edit
                    selectedUser={selectedUser}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
};

export default Dashboard;
