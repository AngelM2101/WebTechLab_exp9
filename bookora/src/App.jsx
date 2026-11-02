
import { useState } from "react";
import "./App.css";

// Header Component
const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="app-header">
      <div className="brand">
        <h2>📚 BOOKORA</h2>
        <p>Discover Stories, Share Books</p>
      </div>

      <div className="header-actions">
        <span>Welcome, <strong>Reader!</strong></span>

        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </header>
  );
};

// Statistics Card Component
const StatCard = ({ title, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <span className="stat-title">{title}</span>
      </div>

      <div className="stat-body">
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
};

// Book List Component
const BookList = ({ books, onToggleBook, onDeleteBook }) => {
  return (
    <div className="book-container">
      <h3>Available Books</h3>

      <ul className="book-list">
        {books.length === 0 ? (
          <li className="empty-state">
            No books available.
          </li>
        ) : (
          books.map((book) => (
            <li
              key={book.id}
              className={`book-item ${book.sold ? "completed" : ""}`}
            >
              <label className="book-label">
                <input
                  type="checkbox"
                  checked={book.sold}
                  onChange={() => onToggleBook(book.id)}
                />

                <span>
                  <strong>{book.title}</strong>
                  <small> by {book.author} | ₹{book.price}</small>
                </span>
              </label>

              <span className="book-status">
                {book.sold ? "Sold" : "Available"}
              </span>

              <button
                className="delete-btn"
                onClick={() => onDeleteBook(book.id)}
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

// Main Application Component
export default function App() {
  const [theme, setTheme] = useState("light");

  const [bookInput, setBookInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 150,
      sold: false
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 200,
      sold: false
    },
    {
      id: 3,
      title: "Wings of Fire",
      author: "A.P.J. Abdul Kalam",
      price: 120,
      sold: true
    }
  ]);

  // Theme Switching
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  // Add New Book
  const handleAddBook = (e) => {
    e.preventDefault();

    if (
      !bookInput.trim() ||
      !authorInput.trim() ||
      !priceInput.trim() ||
      Number(priceInput) <= 0
    ) {
      alert("Please enter valid book details!");
      return;
    }

    const newBook = {
      id: Date.now(),
      title: bookInput.trim(),
      author: authorInput.trim(),
      price: Number(priceInput),
      sold: false
    };

    setBooks([...books, newBook]);

    setBookInput("");
    setAuthorInput("");
    setPriceInput("");
  };

  // Mark Book as Sold or Available
  const handleToggleBook = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, sold: !book.sold }
          : book
      )
    );
  };

  // Delete Book
  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const totalBooks = books.length;
  const soldBooks = books.filter((book) => book.sold).length;
  const availableBooks = totalBooks - soldBooks;

  return (
    <div className={`app-root ${theme}`}>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="dashboard-content">

        <div className="welcome-section">
          <h1>Welcome to BOOKORA 📖</h1>
          <p>
            Give books a second life and discover
            your next favourite story.
          </p>
        </div>

        {/* Book Statistics */}
        <section className="stats-grid">

          <StatCard
            title="Total Books"
            value={totalBooks}
            icon="📚"
          />

          <StatCard
            title="Available Books"
            value={availableBooks}
            icon="📖"
          />

          <StatCard
            title="Books Sold"
            value={soldBooks}
            icon="🛍️"
          />

        </section>

        {/* Add Book Form */}
        <section className="book-section">

          <h3>Add a Pre-Loved Book</h3>

          <form
            className="book-form"
            onSubmit={handleAddBook}
          >

            <input
              type="text"
              placeholder="Enter book title"
              value={bookInput}
              onChange={(e) =>
                setBookInput(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Enter author name"
              value={authorInput}
              onChange={(e) =>
                setAuthorInput(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Enter price (₹)"
              min="1"
              value={priceInput}
              onChange={(e) =>
                setPriceInput(e.target.value)
              }
            />

            <button type="submit">
              + Add Book
            </button>

          </form>

          {/* Book Inventory */}
          <BookList
            books={books}
            onToggleBook={handleToggleBook}
            onDeleteBook={handleDeleteBook}
          />

        </section>

      </main>
    </div>
  );
}
