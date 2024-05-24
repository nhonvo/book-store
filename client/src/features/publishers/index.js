import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';


const Dashboard = () => {
    const [publishers, setPublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/publishers/?limit=100&page=1');
                setPublishers(response.data.data);
                
            } catch (error) {
                console.error('Error fetching publishers:', error);
            }
        };

        fetchPublishers();
    }, []);

    const handleEdit = id => {
        const [publisher] = publishers.filter(publisher => publisher._id === id);
        setSelectedPublisher(publisher);
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
                axios.delete(`http://localhost:3000/publishers/${id}`)
                    .then((response) => {
                        const deletedPublisher = response.data;
                        console.log(deletedPublisher);
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: `Data has been deleted.`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setPublishers(prevPublishers => prevPublishers.filter(publisher => publisher._id !== id));

                    })
                    .catch((error) => {
                        console.error('Error deleting publisher:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to delete publisher. Please try again later.',
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
                        publishers={publishers}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {isAdding && (
                <Add
                    publishers={publishers}
                    setPublishers={setPublishers}
                    setIsAdding={setIsAdding}
                />
            )}
            {isEditing && (
                <Edit
                    selectedPublisher={selectedPublisher}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
};

export default Dashboard;
