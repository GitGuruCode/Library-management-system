import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListBooks() {
  const [books, setBooks] = useState([]);
  const [showAvailable, setShowAvailable] = useState(true);

  // Fetch books based on the showAvailable state
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const endpoint = showAvailable ? '/books/available' : '/books';
        const response = await axios.get(`http://localhost:5000${endpoint}`);
        setBooks(response.data);
      } catch (error) {
        alert('Error fetching books');
      }
    };
    fetchBooks();
  }, [showAvailable]);

  return (
    <div className="books-list">
      <h3>List of Books</h3>
      <button onClick={() => setShowAvailable(!showAvailable)}>
        {showAvailable ? 'Show All Books' : 'Show Available Books'}
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publication_year}</td>
              <td>{book.availability_status ? 'Available' : 'Not Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListBooks;
