import React from 'react';

const Table = ({ publishers, handleEdit, handleDelete }) => {
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
          {publishers.length > 0 ? (
            publishers.map((publisher, index) => (
              <tr key={publisher._id}>
                <td>{index + 1}</td>
                <td>{publisher.name}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(publisher._id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(publisher._id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No Publishers</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
