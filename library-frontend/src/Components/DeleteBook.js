import React, { useState } from 'react';
import axios from 'axios';

function DeleteBook() {
  const [book_id, setBookId] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:5000/books/${book_id}`);
      alert(response.data.message);
    } catch (error) {
      alert('Error deleting book');
    }
  };

  return (
    <div className="form-container">
      <h3>Delete a Book</h3>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          placeholder="Book ID"
          value={book_id}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <button type="submit">Delete Book</button>
      </form>
    </div>
  );
}

export default DeleteBook;
