import React from 'react';

const Table = ({ authors, handleEdit, handleDelete }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {authors.length > 0 ? (
            authors.map((author, index) => (
              <tr key={author._id}>
                <td>{index + 1}</td>
                <td>{author.name}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(author._id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(author._id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No Authors</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
