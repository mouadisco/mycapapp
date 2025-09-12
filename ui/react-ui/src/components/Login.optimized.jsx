import React, { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../hooks/useAlert';
import { userService } from '../services/api';
import { validateLogin, sanitizeData } from '../utils/validation';
import { MESSAGES } from '../constants';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const { showError } = useAlert();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validation
    const { isValid, errors: validationErrors } = validateLogin(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const sanitizedData = sanitizeData(formData);
      const userData = await userService.authenticate(
        sanitizedData.username, 
        sanitizedData.password
      );
      
      login(userData);
    } catch (err) {
      showError(err.message || MESSAGES.ERROR.LOGIN_FAILED);
    } finally {
      setLoading(false);
    }
  }, [formData, login, showError]);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-icon">📚</span>
            <h1 className="logo-text">BookManager Pro</h1>
          </div>
          <p className="login-subtitle">Connectez-vous à votre compte</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-input ${errors.username ? 'error' : ''}`}
              placeholder="Entrez votre nom d'utilisateur"
              required
              disabled={loading}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Entrez votre mot de passe"
              required
              disabled={loading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Connexion...
              </>
            ) : (
              <>
                <span className="icon">🔐</span>
                Se connecter
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <div className="demo-accounts">
            <h4>Comptes de démonstration :</h4>
            <div className="demo-account">
              <strong>Admin:</strong> admin / admin123
            </div>
            <div className="demo-account">
              <strong>Utilisateur:</strong> user1 / user123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
