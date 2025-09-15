import React, { useState, useCallback } from 'react';
import UserForm from './UserForm';
import UserCard from './UserCard';
import { useUsers } from '../hooks/useUsers';
import { useAlert } from '../hooks/useAlert.jsx';
import { MESSAGES } from '../constants';

const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const { showSuccess, showError } = useAlert();
  const {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    clearError
  } = useUsers();

  // Gestionnaires optimisés avec useCallback
  const handleAddUser = useCallback(async (userData) => {
    const result = await addUser(userData);
    if (result.success) {
      showSuccess(result.message);
      setShowForm(false);
    } else {
      showError(result.message);
    }
  }, [addUser, showSuccess, showError]);

  const handleUpdateUser = useCallback(async (userData) => {
    const result = await updateUser(editingUser.ID, userData);
    if (result.success) {
      showSuccess(result.message);
      setEditingUser(null);
      setShowForm(false);
    } else {
      showError(result.message);
    }
  }, [updateUser, editingUser, showSuccess, showError]);

  const handleDeleteUser = useCallback(async (user) => {
    if (window.confirm(MESSAGES.CONFIRM.DELETE_USER(user.username))) {
      const result = await deleteUser(user.ID);
      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message);
      }
    }
  }, [deleteUser, showSuccess, showError]);

  const handleToggleActive = useCallback(async (user) => {
    const result = await toggleUserStatus(user);
    if (result.success) {
      showSuccess(result.message);
    } else {
      showError(result.message);
    }
  }, [toggleUserStatus, showSuccess, showError]);

  // Handle form submission
  const handleFormSubmit = useCallback((userData) => {
    if (editingUser) {
      handleUpdateUser(userData);
    } else {
      handleAddUser(userData);
    }
  }, [editingUser, handleUpdateUser, handleAddUser]);

  // Handle edit user
  const handleEditUser = useCallback((user) => {
    setEditingUser(user);
    setShowForm(true);
  }, []);

  // Handle cancel form
  const handleCancelForm = useCallback(() => {
    setShowForm(false);
    setEditingUser(null);
  }, []);

  // Affichage des erreurs
  if (error) {
    showError(error);
    clearError();
  }

  return (
    <div className="user-management">

      {/* User Form */}
      {showForm && (
        <UserForm 
          onSubmit={handleFormSubmit}
          loading={loading}
          userToEdit={editingUser}
          onCancel={handleCancelForm}
        />
      )}

      {/* User Management Section */}
      <section className="user-management-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="icon">👥</span>
            Gestion des Utilisateurs
          </h2>
          <div className="section-actions">
            <div className="user-stats">
              <span className="stat-item">
                <span className="stat-number">{users.length}</span>
                <span className="stat-label">Total</span>
              </span>
              <span className="stat-item">
                <span className="stat-number">
                  {users.filter(u => u.isActive).length}
                </span>
                <span className="stat-label">Actifs</span>
              </span>
              <span className="stat-item">
                <span className="stat-number">
                  {users.filter(u => u.role === 'admin').length}
                </span>
                <span className="stat-label">Admins</span>
              </span>
            </div>
            {!showForm && (
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <span className="icon">➕</span>
                Ajouter un utilisateur
              </button>
            )}
          </div>
        </div>
        
        <div className="user-management-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner-large"></div>
              <p>Chargement des utilisateurs...</p>
            </div>
          ) : (
            <div className="users-grid">
              {users.map(user => (
                <UserCard
                  key={user.ID}
                  user={user}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserManagement;
