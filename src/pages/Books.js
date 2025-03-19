import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import "./Book.css"; 

const Books = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    fetch(`${API_BASE_URL}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart([...cart, book]);
    alert(`${book.title} added to cart!`);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const nextPage = () => {
    if (indexOfLastBook < books.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="books-container">
      <h2 className="heading">All Books</h2>

      <div className="row">
        {currentBooks.map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-img-wrapper">
                <img
                  src={book.image}
                  alt={book.title}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">${book.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(book)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">Page {currentPage}</span>
        <button
          className="pagination-btn"
          onClick={nextPage}
          disabled={indexOfLastBook >= books.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
