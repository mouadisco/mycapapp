import React, { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validateBook, sanitizeData } from '../utils/validation';
import { MESSAGES } from '../constants';

const BookForm = React.memo(({ onSubmit, loading }) => {
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    stock: 0
  });
  const [errors, setErrors] = useState({});

  // Ne pas afficher le formulaire si l'utilisateur n'est pas admin
  if (!isAdmin()) {
    return null;
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newFormData = {
        ...prev,
        [name]: name === 'stock' ? (value === '' ? 0 : Math.max(0, parseInt(value) || 0)) : value
      };
      return newFormData;
    });

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Validation
    const { isValid, errors: validationErrors } = validateBook(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // Nettoyer et soumettre les données
    const sanitizedData = sanitizeData(formData);
    onSubmit(sanitizedData);
    
    // Réinitialiser le formulaire
    setFormData({ title: '', author: '', stock: 0 });
    setErrors({});
  }, [formData, onSubmit]);

  return (
    <section className="book-form-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="icon">➕</span>
          Add New Book
        </h2>
        <p className="section-description">Enter book details to add to your library</p>
      </div>
      
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Book Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter book title"
            required
            disabled={loading}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`form-input ${errors.author ? 'error' : ''}`}
            placeholder="Enter author name"
            required
            disabled={loading}
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="stock" className="form-label">Stock Quantity</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className={`form-input ${errors.stock ? 'error' : ''}`}
            min="0"
            placeholder="0"
            disabled={loading}
          />
          {errors.stock && <span className="error-message">{errors.stock}</span>}
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Adding...
            </>
          ) : (
            <>
              <span className="icon">📖</span>
              Add Book
            </>
          )}
        </button>
      </form>
    </section>
  );
});

BookForm.displayName = 'BookForm';

export default BookForm;
