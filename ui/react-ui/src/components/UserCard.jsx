import React from 'react';

const UserCard = ({ user, onEdit, onDelete, onToggleActive }) => {
  const { ID, username, email, firstName, lastName, role, isActive } = user;
  
  const getRoleIcon = (role) => {
    return role === 'admin' ? '👑' : '👤';
  };

  const getRoleColor = (role) => {
    return role === 'admin' ? 'admin' : 'user';
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'success' : 'danger';
  };

  const getStatusIcon = (isActive) => {
    return isActive ? '✅' : '❌';
  };

  return (
    <div className="user-card">
      <div className="user-info">
        <div className="user-header">
          <div className="user-avatar-large">
            {firstName ? firstName[0].toUpperCase() : username[0].toUpperCase()}
          </div>
          <div className="user-details">
            <h3 className="user-name">{firstName} {lastName}</h3>
            <span className="user-username">@{username}</span>
          </div>
          <span className="user-id">#{ID}</span>
        </div>
        
        <div className="user-contact">
          <span className="contact-label">📧</span>
          <span className="contact-value">{email}</span>
        </div>
        
        <div className="user-meta">
          <div className="user-role">
            <span className="role-icon">{getRoleIcon(role)}</span>
            <span className={`role-value role-${getRoleColor(role)}`}>
              {role === 'admin' ? 'Administrateur' : 'Utilisateur'}
            </span>
          </div>
          
          <div className="user-status">
            <span className="status-icon">{getStatusIcon(isActive)}</span>
            <span className={`status-value status-${getStatusColor(isActive)}`}>
              {isActive ? 'Actif' : 'Inactif'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="user-actions">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onEdit(user)}
          title="Modifier l'utilisateur"
        >
          <span className="icon">✏️</span>
        </button>
        
        <button
          className={`btn btn-sm ${isActive ? 'btn-warning' : 'btn-success'}`}
          onClick={() => onToggleActive(user)}
          title={isActive ? 'Désactiver le compte' : 'Activer le compte'}
        >
          <span className="icon">{isActive ? '⏸️' : '▶️'}</span>
        </button>
        
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(user)}
          title="Supprimer l'utilisateur"
        >
          <span className="icon">🗑️</span>
        </button>
      </div>
    </div>
  );
};

export default UserCard;
