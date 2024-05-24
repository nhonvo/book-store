import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Add = ({ authors, setAuthors, setIsAdding }) => {
  const [name, setName] = useState('');

  const handleAdd = async (e) => {
    //    e.preventDefault();

    if (!name) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    try {
      const response = await axios.post('http://localhost:3000/authors', {
        name
      });

      const newAuthor = response.data;
      setAuthors([...authors, newAuthor]);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${name}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });

      setIsAdding(false);
    } catch (error) {
      console.error('Error adding author:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while adding the author.',
        showConfirmButton: true,
      });
    }
  };
  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Author</h1>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
