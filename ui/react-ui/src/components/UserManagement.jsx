import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import UserCard from './UserCard';
import Alert from './Alert';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Load users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/odata/v4/catalog/Users?$orderby=ID');
      setUsers(response.data.value || response.data);
    } catch (err) {
      setError(err?.response?.data?.error?.message || err?.message || 'Échec du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Add new user
  const handleAddUser = async (userData) => {
    try {
      setError('');
      setSuccess('');
      
      console.log('handleAddUser received:', userData);
      
      const payload = {
        username: userData.username.trim(),
        email: userData.email.trim(),
        password: userData.password.trim(),
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        role: userData.role,
        isActive: userData.isActive
      };
      
      console.log('Sending to API:', payload);
      
      const response = await axios.post('/odata/v4/catalog/Users', payload);
      console.log('API response:', response.data);
      
      setSuccess(`Utilisateur "${userData.username}" ajouté avec succès !`);
      await loadUsers();
      setShowForm(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error adding user:', err);
      setError(err?.response?.data?.error?.message || err?.message || 'Échec de l\'ajout de l\'utilisateur');
    }
  };

  // Update user
  const handleUpdateUser = async (userData) => {
    try {
      setError('');
      setSuccess('');
      
      const payload = {
        username: userData.username.trim(),
        email: userData.email.trim(),
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        role: userData.role,
        isActive: userData.isActive
      };

      // Only include password if provided
      if (userData.password.trim()) {
        payload.password = userData.password.trim();
      }
      
      console.log('Updating user:', editingUser.ID, payload);
      
      await axios.patch(`/odata/v4/catalog/Users(${editingUser.ID})`, payload);
      
      setSuccess(`Utilisateur "${userData.username}" modifié avec succès !`);
      await loadUsers();
      setEditingUser(null);
      setShowForm(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err?.response?.data?.error?.message || err?.message || 'Échec de la modification de l\'utilisateur');
    }
  };

  // Delete user
  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.username}" ?`)) {
      return;
    }

    try {
      setError('');
      await axios.delete(`/odata/v4/catalog/Users(${user.ID})`);
      setSuccess('Utilisateur supprimé avec succès !');
      await loadUsers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err?.response?.data?.error?.message || err?.message || 'Échec de la suppression de l\'utilisateur');
    }
  };

  // Toggle user active status
  const handleToggleActive = async (user) => {
    try {
      setError('');
      await axios.patch(`/odata/v4/catalog/Users(${user.ID})`, {
        isActive: !user.isActive
      });
      setSuccess(`Utilisateur ${!user.isActive ? 'activé' : 'désactivé'} avec succès !`);
      await loadUsers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err?.response?.data?.error?.message || err?.message || 'Échec de la modification du statut');
    }
  };

  // Handle form submission
  const handleFormSubmit = (userData) => {
    if (editingUser) {
      handleUpdateUser(userData);
    } else {
      handleAddUser(userData);
    }
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Handle cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  // Clear alerts
  const clearError = () => setError('');
  const clearSuccess = () => setSuccess('');

  return (
    <div className="user-management">
      {/* Success Alert */}
      {success && (
        <Alert 
          type="success" 
          message={success} 
          onClose={clearSuccess}
        />
      )}
      
      {/* Error Alert */}
      {error && (
        <Alert 
          type="error" 
          message={error} 
          onClose={clearError}
        />
      )}

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
