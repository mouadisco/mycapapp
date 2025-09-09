import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import Components
import Header from './components/Header';
import BookForm from './components/BookForm';
import BookLibrary from './components/BookLibrary';
import Alert from './components/Alert';

// Import Styles
import './styles/design-system.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load books from API
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/odata/v4/catalog/Books?$orderby=ID');
      setBooks(response.data.value || response.data);
    } catch (err) {
      setError(err?.response?.data?.error?.message || err?.message || 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  // Load books on component mount
  useEffect(() => {
    loadBooks();
  }, []);

  // Add new book
  const handleAddBook = async (bookData) => {
    try {
      setError('');
      setSuccess('');
      
      await axios.post('/odata/v4/catalog/Books', {
        title: bookData.title.trim(),
        author: bookData.author.trim(),
        stock: Number(bookData.stock) || 0
      });
      
      setSuccess(`Book "${bookData.title}" added successfully!`);
      await loadBooks();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err?.response?.data?.error?.message || err?.message || 'Failed to add book');
    }
  };

  // Update book stock
  const handleUpdateStock = async (bookId, stockData) => {
    try {
      setError('');
      await axios.patch(`/odata/v4/catalog/Books(${bookId})`, stockData);
      await loadBooks();
    } catch (err) {
      setError(err?.response?.data?.error?.message || err?.message || 'Failed to update book');
    }
  };

  // Delete book
  const handleDeleteBook = async (bookId) => {
    try {
      setError('');
      await axios.delete(`/odata/v4/catalog/Books(${bookId})`);
      setSuccess('Book deleted successfully!');
      await loadBooks();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err?.response?.data?.error?.message || err?.message || 'Failed to delete book');
    }
  };

  // Clear alerts
  const clearError = () => setError('');
  const clearSuccess = () => setSuccess('');

  return (
    <div className="app">
      <Header />
      
      <main className="container">
        {/* Success Alert */}
        {success && (
          <Alert 
            type="success" 
            message={success} 
            onClose={clearSuccess}
          />
        )}
        
        {/* Error Alert */}
        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={clearError}
          />
        )}
        
        {/* Add Book Form */}
        <BookForm 
          onSubmit={handleAddBook}
          loading={loading}
        />
        
        {/* Book Library */}
        <BookLibrary 
          books={books}
          loading={loading}
          onUpdateStock={handleUpdateStock}
          onDelete={handleDeleteBook}
        />
      </main>
    </div>
  );
}

export default App;