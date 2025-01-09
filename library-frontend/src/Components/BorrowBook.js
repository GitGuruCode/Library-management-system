import React, { useState } from 'react';
import axios from 'axios';

function BorrowBook() {
  const [book_id, setBookId] = useState('');
  const [user_id, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/borrow', { book_id, user_id });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error borrowing book');
    }
  };

  return (
    <div className="form-container">
      <h3>Borrow a Book</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book ID"
          value={book_id}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="User ID"
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Borrow Book</button>
      </form>
    </div>
  );
}

export default BorrowBook;
