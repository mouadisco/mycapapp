import React, { useState } from 'react';

const BookForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    stock: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    if (formData.title.trim() && formData.author.trim()) {
      console.log('Calling onSubmit with:', formData);
      onSubmit(formData);
      setFormData({ title: '', author: '', stock: 0 });
    } else {
      console.log('Form validation failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to:`, value);
    
    setFormData(prev => {
      const newFormData = {
        ...prev,
        [name]: name === 'stock' ? (value === '' ? 0 : Math.max(0, parseInt(value) || 0)) : value
      };
      
      console.log('New form data:', newFormData);
      return newFormData;
    });
  };

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
            className="form-input"
            placeholder="Enter book title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter author name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="stock" className="form-label">Stock Quantity</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="form-input"
            min="0"
            placeholder="0"
          />
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
};

export default BookForm;
