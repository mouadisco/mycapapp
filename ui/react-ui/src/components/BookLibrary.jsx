import React from 'react';
import BookCard from './BookCard';

const BookLibrary = ({ books, loading, onUpdateStock, onDelete }) => {
  if (loading) {
    return (
      <section className="book-library-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="icon">📚</span>
            Book Library
          </h2>
        </div>
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Loading your library...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="book-library-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="icon">📚</span>
          Book Library
        </h2>
        <div className="library-stats">
          <span className="stat-item">
            <span className="stat-number">{books.length}</span>
            <span className="stat-label">Total Books</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">
              {books.reduce((sum, book) => sum + (book.stock || 0), 0)}
            </span>
            <span className="stat-label">Total Copies</span>
          </span>
        </div>
      </div>
      
      <div className="library-content">
        {books.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3 className="empty-title">No books in your library</h3>
            <p className="empty-description">
              Start building your collection by adding your first book above.
            </p>
          </div>
        ) : (
          <div className="books-grid">
            {books.map(book => (
              <BookCard
                key={book.ID}
                book={book}
                onUpdateStock={onUpdateStock}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookLibrary;
