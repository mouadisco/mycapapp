import React, { useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getStockColor, getStockIcon } from '../utils/helpers';

const BookCard = React.memo(({ book, onUpdateStock, onDelete }) => {
  const { isAdmin } = useAuth();
  const { ID, title, author, stock } = book;
  
  const stockColor = getStockColor(stock);
  const stockIcon = getStockIcon(stock);

  const handleIncrementStock = useCallback(() => {
    onUpdateStock(ID, { stock: stock + 1 });
  }, [ID, stock, onUpdateStock]);

  const handleDecrementStock = useCallback(() => {
    onUpdateStock(ID, { stock: Math.max(stock - 1, 0) });
  }, [ID, stock, onUpdateStock]);

  const handleDelete = useCallback(() => {
    onDelete(ID);
  }, [ID, onDelete]);

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
          <span className="stock-icon">{stockIcon}</span>
          <span className={`stock-value stock-${stockColor}`}>
            {stock} {stock === 1 ? 'copy' : 'copies'}
          </span>
        </div>
      </div>
      
      {isAdmin() && (
        <div className="book-actions">
          <button
            className="btn btn-success btn-sm"
            onClick={handleIncrementStock}
            title="Add one copy"
          >
            <span className="icon">➕</span>
          </button>
          
          <button
            className="btn btn-warning btn-sm"
            onClick={handleDecrementStock}
            disabled={stock === 0}
            title="Remove one copy"
          >
            <span className="icon">➖</span>
          </button>
          
          <button
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
            title="Delete book"
          >
            <span className="icon">🗑️</span>
          </button>
        </div>
      )}
    </div>
  );
});

BookCard.displayName = 'BookCard';

export default BookCard;
