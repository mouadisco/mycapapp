import React from 'react';

const BookCard = ({ book, onUpdateStock, onDelete }) => {
  const { ID, title, author, stock } = book;
  
  const getStockColor = (stock) => {
    if (stock > 10) return 'success';
    if (stock > 5) return 'warning';
    if (stock > 0) return 'info';
    return 'danger';
  };

  const getStockIcon = (stock) => {
    if (stock > 10) return '📚';
    if (stock > 5) return '📖';
    if (stock > 0) return '📗';
    return '📕';
  };

  return (
    <div className="book-card">
      <div className="book-info">
        <div className="book-header">
          <h3 className="book-title">{title}</h3>
          <span className="book-id">#{ID}</span>
        </div>
        
        <div className="book-author">
          <span className="author-label">by</span>
          <span className="author-name">{author}</span>
        </div>
        
        <div className="book-stock">
          <span className="stock-icon">{getStockIcon(stock)}</span>
          <span className={`stock-value stock-${getStockColor(stock)}`}>
            {stock} {stock === 1 ? 'copy' : 'copies'}
          </span>
        </div>
      </div>
      
      <div className="book-actions">
        <button
          className="btn btn-success btn-sm"
          onClick={() => onUpdateStock(ID, { stock: stock + 1 })}
          title="Add one copy"
        >
          <span className="icon">➕</span>
        </button>
        
        <button
          className="btn btn-warning btn-sm"
          onClick={() => onUpdateStock(ID, { stock: Math.max(stock - 1, 0) })}
          disabled={stock === 0}
          title="Remove one copy"
        >
          <span className="icon">➖</span>
        </button>
        
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(ID)}
          title="Delete book"
        >
          <span className="icon">🗑️</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
