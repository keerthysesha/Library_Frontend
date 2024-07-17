import React, { useState } from 'react';
import './AddNewBooksComponent.css';
import axios from 'axios';

const AddNewBooksComponent = () => {
  const [bookInfo, setBookInfo] = useState({
    bookName: '',
    authorName: '',
    ISBN: '',
    genre: '',
  });

  const bookNameHandler = (event) => {
    setBookInfo({
      ...bookInfo,
      bookName: event.target.value,
    });
  };

  const authorNameHandler = (event) => {
    setBookInfo({
      ...bookInfo,
      authorName: event.target.value,
    });
  };

  const ISBNHandler = (event) => {
    setBookInfo({
      ...bookInfo,
      ISBN: event.target.value,
    });
  };

  const genreHandler = (event) => {
    setBookInfo({
      ...bookInfo,
      genre: event.target.value,
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:3500/api/v1/books/`, bookInfo)
      .then((response) => {
        console.log(response)
        alert(`${response.data.bookName} is added successfully.`)
        window.location.href='/'
      })
      .catch((error) => {
        if(error.response)
        {
          alert(`(Status : ${error.response.status}) ${error.response.data.message}`);
        }
      })
  };

  const { bookName, authorName, ISBN, genre } = bookInfo;

  return (
    <form className='form-container' onSubmit={formSubmitHandler}>
      <h2>Adding a new book</h2>

      <div className='form-group'>
        <label>Book Name</label>
        <input
          type='text'
          placeholder='Enter the book name'
          value={bookName}
          onChange={bookNameHandler}
          required
        />
      </div>

      <div className='form-group'>
        <label>Author Name</label>
        <input
          type='text'
          className='form-control'
          placeholder='Enter the author name'
          value={authorName}
          onChange={authorNameHandler}
          required
        />
      </div>

      <div className='form-group'>
        <label>ISBN Number</label>
        <input
          type='text'
          pattern='[0-9]{13}'
          placeholder='Enter the ISBN Number'
          value={ISBN}
          onChange={ISBNHandler}
          required
        />
      </div>

      <div className='form-group'>
        <label>Genre</label>
        <select
          value={genre}
          onChange={genreHandler}
          required
        >
          <option value="">Select a genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Historical Fiction">Historical Fiction</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>

      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
};

export default AddNewBooksComponent;
