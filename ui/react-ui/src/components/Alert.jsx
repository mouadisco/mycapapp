import React from 'react';

const Alert = ({ type, message, onClose }) => {
  const alertClasses = `alert alert-${type}`;
  
  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={alertClasses}>
      <div className="alert-content">
        <span className="alert-icon">{getIcon()}</span>
        <span className="alert-message">{message}</span>
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          <span>×</span>
        </button>
      )}
    </div>
  );
};

export default Alert;
