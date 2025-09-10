import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Récupérer tous les utilisateurs
      const response = await axios.get('/odata/v4/catalog/Users');
      const users = response.data.value || response.data;
      
      // Vérifier les identifiants
      const user = users.find(u => 
        u.username === formData.username && 
        u.password === formData.password &&
        u.isActive === true
      );

      if (user) {
        // Connexion réussie
        login({
          id: user.ID,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        });
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

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
          {error && (
            <div className="alert alert-error">
              <span className="alert-icon">❌</span>
              <span className="alert-message">{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Entrez votre nom d'utilisateur"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Entrez votre mot de passe"
              required
              disabled={loading}
            />
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
