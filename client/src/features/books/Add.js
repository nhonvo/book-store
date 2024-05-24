import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Add = ({ books, setBooks, setIsAdding }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
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

  const handleAdd = async (e) => {
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
      console.log(author);
      const response = await axios.post('http://localhost:3000/books', {
        name,
        year,
        author,
        publisher
      });

      const newBook = response.data;
      setBooks([...books, newBook]);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${name}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });

      setIsAdding(false);
    } catch (error) {
      console.error('Error adding book:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while adding the book.',
        showConfirmButton: true,
      });
    }
  };
  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Book</h1>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
