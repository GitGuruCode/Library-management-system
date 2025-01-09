import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/books', {
        title,
        author,
        publication_year: year,
      });
      alert('Book added successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
