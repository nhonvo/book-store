import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Edit = ({ selectedAuthor, setIsEditing }) => {
  const id = selectedAuthor._id;

  const [name, setAuthorName] = useState(selectedAuthor.name);

  const handleUpdate = async (e) => {
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
      const response = await axios.put(`http://localhost:3000/authors/${id}`, {
        name
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
      console.error('Error updating author:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update author.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Author</h1>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setAuthorName(e.target.value)}
        />

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
