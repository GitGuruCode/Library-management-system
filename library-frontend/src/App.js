import React from 'react';
import './styles.css';
import AddBook from './Components/AddBook';
import ListBooks from './Components/ListBooks';
import BorrowBook from './Components/BorrowBook';
import ReturnBook from './Components/ReturnBook';
import UpdateBook from './Components/UpdateBook';
import DeleteBook from './Components/DeleteBook';

function App() {
  return (
    <div>
      <h1>Library Management System</h1>
      <AddBook />
      <ListBooks />
      <BorrowBook />
      <ReturnBook />
      <UpdateBook />
      <DeleteBook />
    </div>
  );
}

export default App;
