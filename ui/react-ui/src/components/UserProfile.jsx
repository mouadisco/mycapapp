import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, logout, isAdmin } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="user-profile">
      <div className="user-info-display">
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
      </div>

      {/* Bouton de déconnexion rouge visible */}
      <button 
        className="logout-button-direct"
        onClick={handleLogout}
        title="Se déconnecter de l'application"
      >
        <span className="icon">🚪</span>
      </button>
    </div>
  );
};

export default UserProfile;
