import { useState, useEffect, useCallback } from 'react';
import { bookService } from '../services/api';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await bookService.getAll();
      setBooks(data);
    } catch (err) {
      setError(err.message || 'Failed to load books');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = useCallback(async (bookData) => {
    try {
      setError('');
      const newBook = await bookService.create(bookData);
      setBooks(prev => [...prev, newBook]);
      return { success: true, message: `Book "${bookData.title}" added successfully!` };
    } catch (err) {
      const errorMessage = err.message || 'Failed to add book';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  const updateBook = useCallback(async (bookId, updateData) => {
    try {
      setError('');
      const updatedBook = await bookService.update(bookId, updateData);
      setBooks(prev => prev.map(book => 
        book.ID === bookId ? { ...book, ...updatedBook } : book
      ));
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Failed to update book';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  const deleteBook = useCallback(async (bookId) => {
    try {
      setError('');
      await bookService.delete(bookId);
      setBooks(prev => prev.filter(book => book.ID !== bookId));
      return { success: true, message: 'Book deleted successfully!' };
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete book';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  return {
    books,
    loading,
    error,
    loadBooks,
    addBook,
    updateBook,
    deleteBook,
    clearError: () => setError('')
  };
};
