import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';


const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/books/?limit=100&page=1');
                setBooks(response.data.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleEdit = id => {
        const [book] = books.filter(book => book._id === id);
        setSelectedBook(book);
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
                axios.delete(`http://localhost:3000/books/${id}`)
                    .then((response) => {
                        const deletedBook = response.data;
                        console.log(deletedBook);
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: `Data has been deleted.`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
                    })
                    .catch((error) => {
                        console.error('Error deleting book:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to delete book. Please try again later.',
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
                        books={books}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {isAdding && (
                <Add
                    books={books}
                    setBooks={setBooks}
                    setIsAdding={setIsAdding}
                />
            )}
            {isEditing && (
                <Edit
                    selectedBook={selectedBook}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
};

export default Dashboard;
