import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, logout, isAdmin } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <div className="user-profile" ref={dropdownRef}>
      <button 
        className="user-button"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-expanded={showDropdown}
        aria-haspopup="true"
      >
        <div className="user-avatar">
          {user.firstName ? user.firstName[0].toUpperCase() : user.username[0].toUpperCase()}
        </div>
        <div className="user-info">
          <span className="user-name">
            {user.firstName ? `${user.firstName} ${user.lastName}` : user.username}
          </span>
          <span className="user-role">
            {isAdmin() ? '👑 Admin' : '👤 Utilisateur'}
          </span>
        </div>
        <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
      </button>

      {showDropdown && (
        <div className="user-dropdown">
          <div className="dropdown-header">
            <div className="user-details">
              <div className="user-email">{user.email}</div>
              <div className="user-role-badge">
                {isAdmin() ? 'Administrateur' : 'Utilisateur'}
              </div>
            </div>
          </div>
          <div className="dropdown-divider"></div>
          <button 
            className="dropdown-item logout-button"
            onClick={handleLogout}
            title="Se déconnecter de l'application"
          >
            <span className="icon">🚪</span>
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
