import React, { useState } from 'react';
import axios from 'axios';

function UpdateBook() {
  const [book_id, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publication_year, setYear] = useState('');
  const [availability_status, setAvailabilityStatus] = useState(true);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/books/${book_id}`, {
        title,
        author,
        publication_year,
        availability_status,
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error updating book');
    }
  };

  return (
    <div className="form-container">
      <h3>Update Book Details</h3>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Book ID"
          value={book_id}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={publication_year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label>
          Availability Status:
          <select
            value={availability_status}
            onChange={(e) => setAvailabilityStatus(e.target.value === 'true')}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </label>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default UpdateBook;
