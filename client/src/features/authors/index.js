import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';


const Dashboard = () => {
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/authors/?limit=100&page=1');
                setAuthors(response.data.data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchAuthors();
    }, []);

    const handleEdit = id => {
        const [author] = authors.filter(author => author._id === id);
        setSelectedAuthor(author);
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
                axios.delete(`http://localhost:3000/authors/${id}`)
                    .then((response) => {
                        const deletedAuthor = response.data;
                        console.log(deletedAuthor);
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: `Data has been deleted.`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        const updatedAuthors = authors.filter((author) => author.id !== id);
                        localStorage.setItem('authors_data', JSON.stringify(updatedAuthors));
                        setAuthors(prevAuthors => prevAuthors.filter(author => author._id !== id));


                    })
                    .catch((error) => {
                        console.error('Error deleting author:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to delete author. Please try again later.',
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
                        authors={authors}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {isAdding && (
                <Add
                    authors={authors}
                    setAuthors={setAuthors}
                    setIsAdding={setIsAdding}
                />
            )}
            {isEditing && (
                <Edit
                    selectedAuthor={selectedAuthor}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
};

export default Dashboard;
