import React from 'react';

const Table = ({ books, handleEdit, handleDelete }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Year</th>
            <th>Author</th>
            <th>Publisher</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.name}</td>
                <td>{book.year}</td>
                <td>{book?.author?.name}</td>
                <td>{book?.publisher?.name}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(book._id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No Books</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
