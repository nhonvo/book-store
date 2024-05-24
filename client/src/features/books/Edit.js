import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Edit = ({ selectedBook, setIsEditing }) => {
  const id = selectedBook._id;

  const [name, setBookName] = useState(selectedBook.name);
  const [year, setYear] = useState(selectedBook.year);
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [publisher, setPublisher] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authors?sort=&key=&limit=100&page=1');
        setAuthors(response.data.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
    const fetchPublishers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/publishers?sort=&key=&limit=100&page=1');
        setPublishers(response.data.data);
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    };

    fetchPublishers();
  }, []);
  const handleUpdate = async (e) => {
    //    e.preventDefault();

    if (!name || !year) {

      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    try {
      const response = await axios.put(`http://localhost:3000/books/${id}`, {
        name,
        year,
        author,
        publisher,
      });


      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${response.data.data.name}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating book:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update book.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Book</h1>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setBookName(e.target.value)}
        />
        <label htmlFor="year">Year</label>
        <input
          id="year"
          type="number"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label htmlFor="author">Author</label>
        <select
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          {authors.map((author, index) => (
            <option key={index} value={author.id}>{author.name}</option>
          ))}
        </select>
        <label htmlFor="publisher">Publisher</label>
        <select
          id="publisher"
          name="publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        >
          {publishers.map((publisher, index) => (
            <option key={index} value={publisher.id}>{publisher.name}</option>
          ))}
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
