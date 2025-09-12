import React, { useState } from 'react';

const UserForm = ({ onSubmit, loading, userToEdit = null, onCancel }) => {
  const [formData, setFormData] = useState({
    username: userToEdit?.username || '',
    email: userToEdit?.email || '',
    password: '',
    firstName: userToEdit?.firstName || '',
    lastName: userToEdit?.lastName || '',
    role: userToEdit?.role || 'user',
    isActive: userToEdit?.isActive !== undefined ? userToEdit.isActive : true
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User form submitted with data:', formData);
    
    // Validation
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Le nom d\'utilisateur est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!userToEdit && !formData.password.trim()) newErrors.password = 'Le mot de passe est requis';
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Field ${name} changed to:`, value);
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const isEditMode = !!userToEdit;

  return (
    <section className="user-form-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="icon">{isEditMode ? '✏️' : '➕'}</span>
          {isEditMode ? 'Modifier l\'utilisateur' : 'Ajouter un nouvel utilisateur'}
        </h2>
        <p className="section-description">
          {isEditMode ? 'Modifiez les informations de l\'utilisateur' : 'Créez un nouveau compte utilisateur'}
        </p>
      </div>
      
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-input ${errors.username ? 'error' : ''}`}
              placeholder="Entrez le nom d'utilisateur"
              required
              disabled={loading}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Entrez l'email"
              required
              disabled={loading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              placeholder="Entrez le prénom"
              required
              disabled={loading}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              placeholder="Entrez le nom"
              required
              disabled={loading}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mot de passe {isEditMode && '(laisser vide pour ne pas changer)'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder={isEditMode ? "Nouveau mot de passe (optionnel)" : "Entrez le mot de passe"}
              required={!isEditMode}
              disabled={loading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="role" className="form-label">Rôle</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              disabled={loading}
            />
            <span className="checkbox-text">Compte actif</span>
          </label>
        </div>
        
        <div className="form-actions">
          <button 
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                {isEditMode ? 'Modification...' : 'Ajout...'}
              </>
            ) : (
              <>
                <span className="icon">{isEditMode ? '💾' : '👤'}</span>
                {isEditMode ? 'Modifier' : 'Ajouter l\'utilisateur'}
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserForm;
